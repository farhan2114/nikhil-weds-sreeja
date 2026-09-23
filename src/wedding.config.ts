/**
 * =======================================================================
 * 💍 WEDDING INVITATION — MASTER CLIENT CONFIGURATION FILE
 * =======================================================================
 * To customize this website for any client, EDIT THIS FILE ONLY!
 * 
 * 1. Replace photos in `public/client-images/` using the same names:
 *     - bride.jpg (Bride portrait)
 *     - groom.jpg (Groom portrait)
 *     - banner.jpg (Parallax quote banner)
 *     - gallery-1.jpg to gallery-4.jpg (Gallery moments)
 *     - story-1.jpg to story-4.jpg (Story milestones)
 *     - music.mp3 (Background music)
 * 
 * 2. Edit all names, dates, parents, events, and venue details below.
 * =======================================================================
 */

export const weddingConfig = {
  // -------------------------------------------------------------
  // 1. COUPLE & PARENTS INFORMATION
  // -------------------------------------------------------------
  couple: {
    bride: 'Sreeja Reddy',
    groom: 'Nikhil Reddy',
    navName: 'Sreeja & Nikhil',
    hashtag: '#SREEJAWEDSNIKHIL',
    secondaryHashtag: '#SREENI',

    brideRole: 'The bride',
    brideParentsNote: 'Daughter of Mrs. Janga Sunitha & Mr. Manohar Reddy, Karimnagar.',
    bridePhoto: '/client-images/bride.jpg',
    bridePhotoAlt: 'Sreeja, the bride',

    groomRole: 'The groom',
    groomParentsNote: 'Son of Mrs. Baireddy Latha & Mr. Pulla Reddy, Khammam.',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Nikhil, the groom',
  },

  // -------------------------------------------------------------
  // 2. DATES & CEREMONY TIME
  // -------------------------------------------------------------
  date: {
    label: 'Sunday, 22 November 2026',
    short: '22 . 11 . 2026',
    muhurtham: 'Muhurtham at 10:54 AM',
    targetIso: '2026-11-22T10:54:00-06:00', // CST time for countdown timer
  },

  // -------------------------------------------------------------
  // 3. INVITATION MESSAGE & FAMILY HOSTS
  // -------------------------------------------------------------
  invitation: {
    sanskritMantra: 'Om Sri Ganeshaya Namaha',
    invitationLine: 'With the blessings of our families, we invite you to share in the joy of our wedding.',
    familyLine: `The families of Sreeja & Nikhil
warmly invite you to celebrate
the union of two hearts`,
    romanticLine: 'Two souls, one sacred journey, bound forever in love and devotion.',
    doorsButtonText: 'Tap to open the doors',
    doorsSubText: 'Music will play softly',
  },

  // -------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS LOCATION
  // -------------------------------------------------------------
  venue: {
    name: 'Frisco Hall Event Center',
    city: '5353 Independence Pkwy, Ste 1, Frisco, TX 75035',
    cityName: 'Frisco', // Shows in "Join us in [City]"
    locationUnderMap: 'Frisco · Texas · 22 . 11 . 2026', // Text displayed directly under the map frame
    description: 'Follow the golden path to Frisco Hall Event Center, where our families will be waiting to welcome you.',
    
    // Direct link when clicking "Open in maps" (leave empty to auto-generate from venue + city)
    mapsSearchUrl: 'https://maps.app.goo.gl/nurVigToR7DMZYpE7',
    
    // Interactive Google Maps iframe URL
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.5105149944666!2d-96.75438752360868!3d33.12195017352138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3d8030a4f16f%3A0x8d603a9a175fc0e0!2sFrisco%20Hall%20Event%20Center!5e0!3m2!1sen!2sin!4v1789999750503!5m2!1sen!2sin',
  },

  // -------------------------------------------------------------
  // 5. PARALLAX QUOTE BANNER
  // -------------------------------------------------------------
  banner: {
    image: '/client-images/banner.jpg',
    alt: 'The couple exchanging jasmine flowers',
    quote: 'Two families, one thread, and a morning we’ll remember for the rest of our lives.',
  },

  // -------------------------------------------------------------
  // 6. PHOTO PORTRAIT (A MOMENT OF FOREVER)
  // -------------------------------------------------------------
  gallery: [
    {
      image: '/client-images/gallery-1.jpg',
      alt: 'Sreeja and Nikhil - A cherished moment of togetherness',
    },
  ],

  // -------------------------------------------------------------
  // 7. OUR STORY (MILESTONES)
  // -------------------------------------------------------------
  story: [
    {
      year: '2019',
      title: 'A crowded train',
      text: 'One shared seat from Chennai to Madurai, and a conversation that never really ended.',
      image: '/client-images/story-1.jpg',
      alt: 'Two cups of coffee beside a train window',
    },
    {
      year: '2022',
      title: 'Two cities',
      text: 'Long calls, longer letters, and a promise to meet halfway every single month.',
      image: '/client-images/story-2.jpg',
      alt: 'Handwritten letters tied with a maroon ribbon',
    },
    {
      year: '2026',
      title: 'The question',
      text: 'Asked on a terrace under jasmine lights, answered before the sentence finished.',
      image: '/client-images/story-3.jpg',
      alt: 'A jasmine-decorated terrace at dusk',
    },
    {
      year: '2027',
      title: 'The day',
      text: 'Surrounded by jasmine, bells, and everyone who brought us to this moment.',
      image: '/client-images/story-4.jpg',
      alt: 'Traditional wedding details',
    },
  ],

  // -------------------------------------------------------------
  // 8. ORDER OF CELEBRATIONS / EVENTS
  // -------------------------------------------------------------
  events: [
    {
      name: 'Wedding Ceremony',
      day: 'Sunday, 22 Nov',
      time: '10:54 AM CST',
      place: 'Frisco Hall Event Center',
      note: 'The sacred muhurtham ceremony followed by lunch & celebrations',
      image: '/client-images/wedding-mandapam.jpg',
      startDate: '20261122T100000',
      endDate: '20261122T150000',
    },
  ],

  // -------------------------------------------------------------
  // 9. FAMILY CONTACTS (FOR RSVP QUESTIONS)
  // -------------------------------------------------------------
  familyContacts: [
    {
      name: 'Ramesh Reddy',
      relation: "Groom's Family",
      phone: '+1 (469) 235-8910',
    },
    {
      name: 'Manohar Reddy',
      relation: "Bride's Family",
      phone: '+1 (469) 587-4321',
    },
  ],

  // -------------------------------------------------------------
  // 10. BACKGROUND MUSIC
  // -------------------------------------------------------------
  music: {
    audioUrl: '/client-images/music.mp3',
  },

  // -------------------------------------------------------------
  // 11. RSVP & DATABASE (SUPABASE & GOOGLE SHEETS)
  // -------------------------------------------------------------
  rsvp: {
    enabled: true,
    // Supabase project credentials (paste your client-specific Supabase credentials here)
    supabaseUrl: 'https://drafdjfejejajhglxtyt.supabase.co',
    supabaseAnonKey: 'sb_publishable_0ycGa8kBOxyP8swHUwKzRw_EcxE9jWz',
    supabaseTable: 'rsvps',

    // Google Sheets Webhook URL (paste your deployed Google Apps Script URL here)
    googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbxF6ZEHGppc77on-yjnT3uhVpqcocentmtfip2L0ArM6Br47xAtRnB0DPH88DkdqJXo/exec',
  },

  // -------------------------------------------------------------
  // 12. THANK YOU & GRATITUDE CARD
  // -------------------------------------------------------------
  thankYou: {
    // Header labels
    eyebrow: 'With Love & Gratitude',
    subtitle: 'Thank You For Blessing Us',

    // Couple Names on Thank You card (edit here to override, or leave as-is)
    brideName: 'Sreeja',
    groomName: 'Nikhil',
    ampersand: '&',

    // Heartfelt quote
    closingLine: '“We cannot imagine our celebration without you.”',

    // Centerpiece couple illustration
    coupleIllustration: '/client-images/couple-chibi-transparent.png',
    coupleIllustrationAlt: 'Illustration of Sreeja and Nikhil greeting guests with folded hands',

    // Ceremony date & time line
    dateLine: 'Sunday, November 22, 2026 · 10:54 AM',

    // Venue name displayed on card (leave empty to use venue.name)
    venueLine: 'Frisco Hall Event Center',

    // Bottom family note
    familyNote: 'With love, the families of Sreeja & Nikhil',
  },
};

// Backwards-compatible export for existing components
export const weddingData = {
  ...weddingConfig.couple,
  ...weddingConfig.date,
  dateLabel: weddingConfig.date.label,
  dateShort: weddingConfig.date.short,
  muhurtham: weddingConfig.date.muhurtham,
  venue: weddingConfig.venue.name,
  city: weddingConfig.venue.city,
  cityName: weddingConfig.venue.cityName,
  invitationLine: weddingConfig.invitation.invitationLine,
  familyLine: weddingConfig.invitation.familyLine,
  romanticLine: weddingConfig.invitation.romanticLine,
  events: weddingConfig.events,
  story: weddingConfig.story,
  banner: weddingConfig.banner,
  gallery: weddingConfig.gallery,
};
