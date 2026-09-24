# 📊 Google Sheets RSVP Integration Guide

This guide ensures your Google Sheet automatically records every RSVP submitted on the website in real time.

---

## 1. Current RSVP Columns in Google Sheets

The script records the exact fields from the website:

| Column | Header | Description / Values |
|:---:|:---|:---|
| **A** | **Timestamp** | Date and time the RSVP was received |
| **B** | **Guest Name** | Full name of the primary guest |
| **C** | **Phone Number** | Phone number with country code (e.g. `+1 469 000-0000`) |
| **D** | **Email** | Email address (or `-` if omitted) |
| **E** | **Adults (12+)** | Number of adult attendees |
| **F** | **Children (<12)** | Number of child attendees |
| **G** | **Total Guests** | Total headcount (Adults + Children) |
| **H** | **Dietary Preference** | **Vegetarian** or **Non-Vegetarian** |
| **I** | **Wedding Ceremony** | **Yes** or **No** |
| **J** | **Attending Events** | "Wedding Ceremony" or "None" |
| **K** | **Warm Wishes / Notes** | Message / warm wishes left for Sreeja & Nikhil |

---

## 2. How to Update Your Google Sheet Script (30 Seconds)

1. Open your **Google Sheet**.
2. Click **Extensions** in the top navigation bar → **Apps Script**.
3. Open the file [`google-sheet-script.gs`](./google-sheet-script.gs) in this repository.
4. Copy the entire code and paste it into the Google Apps Script editor, replacing any old code.
5. Click **Save** (💾 icon).

### Quick Test inside Apps Script (Optional):
- In the toolbar dropdown (next to the "Debug" button), select **`testRsvpSubmission`** or **`setupHeaders`**.
- Click **Run**.
- Apps Script will grant permissions and insert a sample test row into your sheet without any errors!

### Deploy as Webhook:
6. Click the blue **Deploy** button at top right:
   - Select **Manage deployments**.
   - Click the **pencil icon** (Edit) on your existing deployment.
   - Under **Version**, select **New version**.
   - Ensure:
     - **Execute as**: `Me`
     - **Who has access**: `Anyone` *(Crucial: do not choose "Only myself")*
   - Click **Deploy**.
7. Copy the **Web app URL** (ends in `/exec`).
8. If the URL changed from the previous one, paste it into [`src/wedding.config.ts`](./src/wedding.config.ts) under:
   ```ts
   rsvp: {
     googleSheetWebhookUrl: 'YOUR_COPIED_URL_HERE',
   }
   ```

---

## 3. How to Test From the Website

1. Visit your website, scroll to the **RSVP** section.
2. Fill in:
   - Name: `Test Guest`
   - Phone: `+1 (469) 555-0199`
   - Adults: `2`, Children: `1`
   - Dietary: `Vegetarian`
   - Wedding Ceremony: `Will Attend`
   - Note: `Congratulations!`
3. Click **Submit RSVP**.
4. Check your Google Sheet: the new row will appear within 2 seconds!
