import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Check, Users, Utensils, HeartHandshake } from "lucide-react";
import { weddingConfig } from "../wedding.config";
import { Ornament, SpinningMandala } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";
import { saveRsvp } from "../lib/supabase";

type AttendanceMap = Record<string, "attending" | "declining" | null>;

interface RsvpData {
  name: string;
  phone: string;
  email: string;
  adultsCount: number;
  childrenCount: number;
  guestCount: number;
  dietary: string;
  attendance: AttendanceMap;
  note: string;
  submittedAt: string;
}

const STORAGE_KEY = "rsvp_submission_nikhil_sreeja";

const DIETARY_OPTIONS = [
  { id: "veg", label: "Vegetarian" },
  { id: "non-veg", label: "Non-Vegetarian" },
];

export const RsvpSection: React.FC = () => {
  const { couple, events, familyContacts } = weddingConfig;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [dietary, setDietary] = useState("Vegetarian");
  const [attendance, setAttendance] = useState<AttendanceMap>(
    Object.fromEntries(events.map((e) => [e.name, null]))
  );
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<RsvpData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as RsvpData) : null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const totalGuests = adultsCount + childrenCount;

  const toggleAttendance = (eventName: string, status: "attending" | "declining") => {
    setAttendance((prev) => ({
      ...prev,
      [eventName]: prev[eventName] === status ? null : status,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number so we can reach you.");
      return;
    }
    const anySelected = Object.values(attendance).some((v) => v !== null);
    if (!anySelected) {
      setError("Please select your attendance for at least one celebration.");
      return;
    }

    const attendingList = events
      .filter((ev) => attendance[ev.name] === "attending")
      .map((ev) => ev.name)
      .join(", ");

    const declinedList = events
      .filter((ev) => attendance[ev.name] === "declining")
      .map((ev) => ev.name)
      .join(", ");

    const data: RsvpData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      adultsCount,
      childrenCount,
      guestCount: totalGuests,
      dietary,
      attendance,
      note: note.trim(),
      submittedAt: new Date().toISOString(),
    };

    const checkStatus = (keyword: string): "Yes" | "No" => {
      const match = Object.keys(attendance).find((k) =>
        k.toLowerCase().includes(keyword.toLowerCase())
      );
      if (!match) return "No";
      return attendance[match] === "attending" ? "Yes" : "No";
    };

    const sangeetStatus = checkStatus("sangeet");
    const weddingStatus =
      checkStatus("wedding") !== "No"
        ? checkStatus("wedding")
        : checkStatus("muhurtham") !== "No"
        ? checkStatus("muhurtham")
        : checkStatus("ceremony");

    setIsSubmitting(true);
    const result = await saveRsvp({
      name: data.name,
      phone: data.phone,
      email: data.email,
      adults_count: data.adultsCount,
      children_count: data.childrenCount,
      guest_count: data.guestCount,
      dietary: data.dietary,
      attending_events: attendingList || "None",
      declined_events: declinedList || "None",
      sangeet: sangeetStatus,
      wedding: weddingStatus,
      note: data.note || "",
    });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Could not save your RSVP. Please check your connection and try again.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }

    setSubmitted(data);
  };

  const handleEditRsvp = () => {
    if (!submitted) return;
    setName(submitted.name);
    setPhone(submitted.phone || "");
    setEmail(submitted.email || "");
    setAdultsCount(submitted.adultsCount || 1);
    setChildrenCount(submitted.childrenCount || 0);
    setDietary(submitted.dietary || "Vegetarian");
    setAttendance(submitted.attendance);
    setNote(submitted.note);
    setSubmitted(null);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden px-5 py-14 sm:py-20">
      <SpinningMandala className="-left-24 bottom-10 w-56 sm:w-72" />
      <Ornament className="-right-8 top-12 w-36 sm:w-48" />

      <div className="relative mx-auto max-w-3xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">You are warmly invited</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">RSVP</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Please let us know if you can join us in celebrating the wedding of{" "}
            <span className="font-display font-medium text-foreground">
              {couple.bride} &amp; {couple.groom}
            </span>
            .
          </p>
          <div className="rule-gold mx-auto mt-7 w-28" />
        </RevealOnScroll>

        {/* ── Confirmation Screen ── */}
        {submitted ? (
          <RevealOnScroll delay={0.1} className="mt-12">
            <div className="paper-card relative overflow-hidden p-8 text-center sm:p-14 border border-gold/40 shadow-xl">
              <span className="pointer-events-none absolute inset-3 border border-gold/25" />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-deep border border-gold/40">
                <Check className="h-7 w-7" />
              </div>

              <h3 className="mt-6 font-display text-3xl sm:text-4xl text-foreground">
                Thank You, {submitted.name}!
              </h3>
              <p className="mt-2 text-sm text-gold-deep font-title uppercase tracking-[0.2em]">
                Your RSVP Has Been Confirmed
              </p>

              <div className="mx-auto mt-8 max-w-md divide-y divide-gold/20 rounded-lg border border-gold/30 bg-muted/30 p-5 text-left text-sm backdrop-blur-sm">
                {/* Attending Events */}
                <div className="pb-3.5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-title">
                    Celebrations Attending
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {events.map((ev) => {
                      const status = submitted.attendance[ev.name];
                      return (
                        <div key={ev.name} className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-foreground">{ev.name}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider font-semibold ${
                              status === "attending"
                                ? "bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                                : status === "declining"
                                ? "bg-rose-900/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                                : "text-muted-foreground"
                            }`}
                          >
                            {status === "attending"
                              ? "Will Attend"
                              : status === "declining"
                              ? "Can't Attend"
                              : "Not Specified"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Breakdown */}
                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-title">
                      Total Guests
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {submitted.adultsCount || 1} Adult{submitted.adultsCount !== 1 ? 's' : ''}
                      {submitted.childrenCount > 0 ? `, ${submitted.childrenCount} Child${submitted.childrenCount > 1 ? 'ren' : ''}` : ''}
                    </p>
                  </div>
                  <span className="font-display text-2xl text-foreground font-semibold">
                    {submitted.guestCount}
                  </span>
                </div>

                {/* Contact & Dietary */}
                <div className="py-3.5 space-y-1.5 text-xs text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Phone:</span> {submitted.phone}
                    {submitted.email ? ` · ${submitted.email}` : ''}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Dietary:</span> {submitted.dietary}
                  </p>
                  {submitted.note && (
                    <p className="pt-1 italic text-foreground/80">
                      &ldquo;{submitted.note}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-sm text-xs text-muted-foreground leading-relaxed">
                We are overjoyed to celebrate these special moments with you. If your travel plans change, you can update your response anytime.
              </p>

              <button
                type="button"
                onClick={handleEditRsvp}
                className="mt-6 inline-flex items-center gap-2 border border-gold/60 bg-transparent px-6 py-2.5 text-[0.68rem] uppercase tracking-[0.25em] text-gold-deep transition-all hover:bg-gold/10"
              >
                Change or Edit RSVP
              </button>
            </div>
          </RevealOnScroll>
        ) : (
          /* ── RSVP Form ── */
          <RevealOnScroll delay={0.1} className="mt-12">
            <form
              onSubmit={handleSubmit}
              className="paper-card relative overflow-hidden p-6 sm:p-12 border border-gold/40 shadow-xl"
            >
              <span className="pointer-events-none absolute inset-3 border border-gold/20" />

              <div className="relative space-y-7">
                {/* Name */}
                <div>
                  <label htmlFor="rsvp-name" className="block text-xs font-title uppercase tracking-[0.22em] text-foreground">
                    Full Name <span className="text-maroon">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded border border-gold/40 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Phone & Email (Side by Side on Desktop) */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rsvp-phone" className="block text-xs font-title uppercase tracking-[0.22em] text-foreground">
                      Phone Number <span className="text-maroon">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        id="rsvp-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (469) 000-0000"
                        className="w-full rounded border border-gold/40 bg-background/70 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rsvp-email" className="block text-xs font-title uppercase tracking-[0.22em] text-foreground">
                      Email Address <span className="text-[0.65rem] lowercase tracking-normal text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <div className="relative mt-2">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        id="rsvp-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full rounded border border-gold/40 bg-background/70 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Separate Adult & Child Guest Counts */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-title uppercase tracking-[0.22em] text-foreground">
                      Guest Count
                    </label>
                    <span className="text-xs text-gold-deep font-title uppercase tracking-wider">
                      Total: {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Adults */}
                    <div className="flex items-center justify-between rounded border border-gold/30 bg-background/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Adults</p>
                        <p className="text-[0.68rem] text-muted-foreground">Age 12 and above</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                          disabled={adultsCount <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-foreground transition-colors hover:bg-gold/15 disabled:opacity-40"
                          aria-label="Decrease adults"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-display text-base font-semibold">{adultsCount}</span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                          className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-foreground transition-colors hover:bg-gold/15"
                          aria-label="Increase adults"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between rounded border border-gold/30 bg-background/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Children</p>
                        <p className="text-[0.68rem] text-muted-foreground">Under age 12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          disabled={childrenCount <= 0}
                          className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-foreground transition-colors hover:bg-gold/15 disabled:opacity-40"
                          aria-label="Decrease children"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-display text-base font-semibold">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))}
                          className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-foreground transition-colors hover:bg-gold/15"
                          aria-label="Increase children"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Celebrations Attendance */}
                <div>
                  <p className="text-xs font-title uppercase tracking-[0.22em] text-foreground mb-1">
                    Will You Attend? <span className="text-maroon">*</span>
                  </p>
                  <p className="text-[0.72rem] text-muted-foreground mb-4">
                    Please mark your attendance for the celebrations:
                  </p>

                  <div className="grid gap-3.5">
                    {events.map((ev) => {
                      const current = attendance[ev.name];
                      return (
                        <div
                          key={ev.name}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gold/30 bg-background/50 p-4 transition-all"
                        >
                          <div>
                            <p className="font-display text-base sm:text-lg text-foreground">{ev.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {ev.day} · {ev.time} · {ev.place}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => toggleAttendance(ev.name, "attending")}
                              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all ${
                                current === "attending"
                                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/50"
                                  : "border border-gold/40 text-foreground/80 hover:bg-gold/10"
                              }`}
                            >
                              Will Attend
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleAttendance(ev.name, "declining")}
                              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all ${
                                current === "declining"
                                  ? "bg-rose-800 text-white shadow-sm ring-2 ring-rose-500/50"
                                  : "border border-gold/40 text-foreground/80 hover:bg-gold/10"
                              }`}
                            >
                              Can&apos;t Attend
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary Preference (Vegetarian / Non-Vegetarian only) */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Utensils className="size-3.5 text-gold-deep" />
                    <label className="text-xs font-title uppercase tracking-[0.22em] text-foreground">
                      Dietary Preference
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {DIETARY_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDietary(opt.label)}
                        className={`rounded-full py-2.5 px-4 text-xs font-title tracking-wider transition-all text-center ${
                          dietary === opt.label
                            ? "bg-gold text-maroon font-bold shadow-md ring-2 ring-gold/50"
                            : "border border-gold/40 bg-background text-foreground/80 hover:border-gold hover:bg-gold/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Wishes / Note */}
                <div>
                  <label htmlFor="rsvp-note" className="block text-xs font-title uppercase tracking-[0.22em] text-foreground">
                    Warm Wishes / Message to the Couple
                  </label>
                  <textarea
                    id="rsvp-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Leave a heartfelt message or note for Sreeja & Nikhil..."
                    className="mt-2 w-full rounded border border-gold/40 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <p className="rounded border border-rose-500/40 bg-rose-950/20 px-4 py-2.5 text-center text-xs text-rose-300">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden rounded-full border border-gold/80 bg-gradient-to-r from-gold/90 via-gold to-gold/90 px-10 py-3.5 text-xs font-title uppercase tracking-[0.3em] text-maroon font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "Saving Your RSVP..." : "Confirm RSVP"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </RevealOnScroll>
        )}

        {/* ── Contact the Family Section (Opaque card so spinning mandala is completely hidden behind) ── */}
        {familyContacts && familyContacts.length > 0 && (
          <RevealOnScroll delay={0.15} className="mt-14 relative z-10">
            <div className="rounded-xl border border-gold/45 bg-[#FAF7F0] p-6 sm:p-8 shadow-2xl text-center relative z-10">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-deep border border-gold/30">
                <HeartHandshake className="size-5" />
              </div>

              <h4 className="mt-3 font-display text-xl sm:text-2xl text-foreground">
                Questions About the Celebrations?
              </h4>
              <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground leading-relaxed">
                If you have questions regarding RSVP, directions, or accommodations, please feel free to reach out to the family:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {familyContacts.map((contact, idx) => {
                  const cleanPhone = contact.phone.replace(/[^0-9+]/g, '');
                  const waPhone = contact.phone.replace(/[^0-9]/g, '');
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center rounded-lg border border-gold/35 bg-[#FFFFFF] p-4.5 transition-all hover:border-gold/60 shadow-md relative z-10"
                    >
                      <p className="font-title text-sm font-semibold text-foreground">{contact.name}</p>
                      <p className="text-[0.68rem] uppercase tracking-wider text-gold-deep font-title mt-0.5">
                        {contact.relation}
                      </p>
                      <p className="mt-2 text-xs font-mono text-muted-foreground">{contact.phone}</p>

                      <div className="mt-3 flex items-center gap-2.5">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-[0.68rem] uppercase tracking-wider text-gold-deep hover:bg-gold/20 transition-colors"
                        >
                          <Phone className="size-3" />
                          Call
                        </a>
                        <a
                          href={`https://wa.me/${waPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-[0.68rem] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                          <MessageCircle className="size-3" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
};
