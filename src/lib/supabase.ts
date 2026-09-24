import { createClient } from '@supabase/supabase-js';
import { weddingConfig } from '../wedding.config';

export interface BlessingItem {
  id: string;
  name: string;
  city: string | null;
  message: string;
  created_at?: string;
}

const SUPABASE_URL = weddingConfig.rsvp?.supabaseUrl || 'https://lyukxpzpcjedvrkwrcur.supabase.co';
const SUPABASE_KEY = weddingConfig.rsvp?.supabaseAnonKey || 'sb_publishable_7USKYo1sBAT7p3_kqWdrqg_RCxNm3yd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const GOOGLE_SHEET_WEBHOOK_URL =
  weddingConfig.rsvp?.googleSheetWebhookUrl ||
  'https://script.google.com/macros/s/AKfycbwLV_52cSrJPWpsMfFJrY4xZ-3iCV8WPR5612i-v9qB_koaaX1u6QfOU3tq5fDLq1b-Mg/exec';

export interface RsvpPayload {
  name: string;
  phone: string;
  email?: string;
  adults_count: number;
  children_count: number;
  guest_count: number;
  dietary?: string;
  attending_events: string;
  declined_events: string;
  wedding?: "Yes" | "No";
  note?: string;
}

export async function saveRsvpToSupabase(payload: RsvpPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Try full insert with dedicated phone, adults, children, dietary columns
    const { error: fullError } = await supabase.from('rsvps').insert([{
      name: payload.name,
      phone: payload.phone,
      email: payload.email || null,
      adults_count: payload.adults_count,
      children_count: payload.children_count,
      guest_count: payload.guest_count,
      dietary: payload.dietary || null,
      attending_events: payload.attending_events,
      declined_events: payload.declined_events,
      note: payload.note || '',
    }]);

    if (!fullError) {
      return { success: true };
    }

    // 2. Graceful fallback if user's Supabase table doesn't have phone/dietary columns yet
    const packedNote = `Phone: ${payload.phone} | Adults: ${payload.adults_count}, Children: ${payload.children_count} | Diet: ${payload.dietary || 'Vegetarian'} | Wedding: ${payload.wedding || 'Yes'}${payload.note ? ` | Note: ${payload.note}` : ''}`;
    
    const { error: fallbackError } = await supabase.from('rsvps').insert([{
      name: payload.name,
      email: payload.email || payload.phone,
      guest_count: payload.guest_count,
      attending_events: payload.attending_events,
      declined_events: payload.declined_events,
      note: packedNote,
    }]);

    if (fallbackError) {
      console.warn('Supabase RSVP insert error:', fallbackError);
      return { success: false, error: fallbackError.message };
    }
    return { success: true };
  } catch (err: any) {
    console.warn('Supabase RSVP exception:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

export async function saveRsvpToGoogleSheet(payload: RsvpPayload): Promise<void> {
  try {
    const formattedTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: formattedTimestamp,
        name: payload.name,
        phone: payload.phone,
        email: payload.email || '-',
        adults: payload.adults_count,
        adults_count: payload.adults_count,
        children: payload.children_count,
        children_count: payload.children_count,
        guest_count: payload.guest_count,
        total_guests: payload.guest_count,
        dietary: payload.dietary || 'Vegetarian',
        dietary_preference: payload.dietary || 'Vegetarian',
        wedding: payload.wedding || 'Yes',
        wedding_ceremony: payload.wedding || 'Yes',
        attending_events: payload.attending_events,
        declined_events: payload.declined_events,
        note: payload.note || '-',
        warm_wishes: payload.note || '-',
      }),
    });
  } catch (err) {
    console.warn('Google Sheet RSVP sync failed:', err);
  }
}

export async function saveRsvp(payload: RsvpPayload): Promise<{ success: boolean; error?: string }> {
  const [supabaseRes, sheetRes] = await Promise.allSettled([
    saveRsvpToSupabase(payload),
    saveRsvpToGoogleSheet(payload),
  ]);

  const supabaseOk = supabaseRes.status === 'fulfilled' && supabaseRes.value.success;
  const sheetOk = sheetRes.status === 'fulfilled';

  if (!supabaseOk && !sheetOk) {
    const errorMsg = supabaseRes.status === 'fulfilled' ? supabaseRes.value.error : 'Network error';
    return { success: false, error: errorMsg };
  }
  return { success: true };
}

const FALLBACK_KEY = 'vows_blessings_cache';

const defaultSeedBlessings: BlessingItem[] = [
  {
    id: 'seed-1',
    name: 'Karthik & Divya',
    city: 'Chennai',
    message: 'Wishing you both a lifetime of laughter, harmony and endless love together!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Lakshmi Auntie',
    city: 'Madurai',
    message: 'Wishing Hanisha and Ronish a lifetime of love, joy, and togetherness. Congratulations!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Siddharth Raman',
    city: 'Bengaluru',
    message: 'From the train rides to the mandapam, so happy to see this journey unfold. Heartiest congratulations!',
    created_at: new Date().toISOString(),
  },
];

export async function fetchBlessings(): Promise<BlessingItem[]> {
  try {
    const { data, error } = await supabase
      .from('blessings')
      .select('id, name, city, message, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;
    if (data && data.length > 0) {
      try {
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(data));
      } catch (_) {}
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, checking local cache:', err);
  }

  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}

  return defaultSeedBlessings;
}

export async function addBlessing(name: string, city: string | null, message: string): Promise<void> {
  const newBlessing: BlessingItem = {
    id: 'local-' + Date.now(),
    name: name.trim(),
    city: city ? city.trim() : null,
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase
      .from('blessings')
      .insert({ name: newBlessing.name, city: newBlessing.city, message: newBlessing.message });
    if (error) throw error;
  } catch (err) {
    console.warn('Supabase insert failed, persisting locally:', err);
  }

  // Always update local cache
  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    const list: BlessingItem[] = cached ? JSON.parse(cached) : [...defaultSeedBlessings];
    list.unshift(newBlessing);
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(list));
  } catch (_) {}
}
