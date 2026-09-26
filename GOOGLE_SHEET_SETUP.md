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

## 2. In-Place Row Updates (No Duplicate Lines!)

When a guest edits their RSVP on the website:
- The website passes `is_update: true` along with the original phone/name/email.
- Google Apps Script searches for their row using their **phone number** (normalized 10-digit matching), **email**, or **name**.
- **Instead of appending a new row**, it updates their existing row directly in-place!
- The timestamp is updated to `[Date, Time] (Edited)`.
- If no previous entry exists, it safely falls back to creating a new row.

---

## 3. How to Update Your Google Sheet Script (30 Seconds)

1. Open your **Google Sheet**.
2. Click **Extensions** in the top navigation bar → **Apps Script**.
3. Open the file [`google-sheet-script.gs`](./google-sheet-script.gs) in this repository.
4. Copy the entire code and paste it into the Google Apps Script editor, replacing the existing code.
5. Click **Save** (💾 icon).

### Quick Test inside Apps Script (Optional):
- In the toolbar dropdown (next to the "Debug" button), select **`testRsvpSubmission`**.
- Click **Run**.
- It will verify both inserting a row and updating the same row in-place. Check the execution log!

### Deploy the New Version:
6. Click the blue **Deploy** button at top right:
   - Select **Manage deployments**.
   - Click the **pencil icon** (✏️ Edit) on your existing active deployment.
   - Under **Version**, click the dropdown and choose **New version**.
   - Ensure:
     - **Execute as**: `Me`
     - **Who has access**: `Anyone` *(Crucial: do not choose "Only myself")*
   - Click **Deploy**.
7. If your Web app URL changed, update [`src/wedding.config.ts`](./src/wedding.config.ts) under `rsvp.googleSheetWebhookUrl`. (Usually the URL stays the same when editing an existing deployment).

---

## 4. How to Test From the Website

1. Visit your website, scroll to the **RSVP** section.
2. Submit an initial RSVP (e.g. `2 Adults`, `Vegetarian`).
3. Notice your Google Sheet adds row 2.
4. On the website confirmation card, click **"Change or Edit RSVP"**.
5. Change Adults to `3` or Dietary to `Non-Vegetarian` and click **"Update RSVP"**.
6. Refresh your Google Sheet: **Row 2 will be updated directly** with the new numbers and the timestamp will show `(Edited)` — **no new row is added!**
