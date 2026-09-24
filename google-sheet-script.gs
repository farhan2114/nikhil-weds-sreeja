/**
 * =======================================================================
 * 💍 SREEJA & NIKHIL WEDDING — GOOGLE SHEETS RSVP WEBHOOK SCRIPT
 * =======================================================================
 * 
 * 1. CLICK "RUN" IN APPS SCRIPT:
 *    - Make sure "setupSheet" is selected in the dropdown next to "Debug".
 *    - Click "Run".
 *    - It will format Row 1 with Royal Maroon headers AND insert a sample 
 *      test RSVP row so you can immediately see the change in your sheet!
 * 
 * 2. DEPLOY AS WEBHOOK:
 *    - Click "Deploy" (blue button at top right) -> "Manage deployments".
 *    - Click the pencil icon (Edit) on the active deployment.
 *    - Select Version: "New version".
 *    - Ensure:
 *        * Execute as: "Me"
 *        * Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself")
 *    - Click "Deploy".
 * =======================================================================
 */

// RSVP Columns Definition (11 Columns)
var HEADERS = [
  "Timestamp",
  "Guest Name",
  "Phone Number",
  "Email",
  "Adults (12+)",
  "Children (<12)",
  "Total Guests",
  "Dietary Preference",
  "Wedding Ceremony",
  "Attending Events",
  "Warm Wishes / Notes"
];

/**
 * MAIN SETUP FUNCTION
 * Run this from the Apps Script editor to initialize headers and insert a sample test row!
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Write the 11 Column Headers to Row 1 (overwrites any old headers)
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  
  // 2. Format Header Row with Royal Maroon & White text
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#7D0A0A"); // Royal Maroon
  headerRange.setFontColor("#FFFFFF");  // Crisp White
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  
  // 3. Set column widths for clean readability
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 180); // Guest Name
  sheet.setColumnWidth(3, 150); // Phone Number
  sheet.setColumnWidth(4, 180); // Email
  sheet.setColumnWidth(5, 110); // Adults
  sheet.setColumnWidth(6, 110); // Children
  sheet.setColumnWidth(7, 110); // Total
  sheet.setColumnWidth(8, 160); // Dietary
  sheet.setColumnWidth(9, 150); // Wedding
  sheet.setColumnWidth(10, 160); // Attending
  sheet.setColumnWidth(11, 260); // Warm Wishes

  // 4. Add a Sample Test RSVP row so you immediately see the sheet update!
  var testRow = [
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
    "Test Guest (Sample RSVP)",
    "'+1 (469) 555-0199",
    "guest@example.com",
    2,
    1,
    3,
    "Vegetarian",
    "Yes",
    "Wedding Ceremony",
    "Heartiest congratulations to Sreeja & Nikhil! Looking forward to celebrating!"
  ];
  
  sheet.appendRow(testRow);
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, testRow.length).setVerticalAlignment("middle");
  sheet.getRange(lastRow, 5, 1, 3).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 9, 1, 1).setHorizontalAlignment("center");

  Logger.log("🎉 SUCCESS! Row 1 headers updated and sample test row added at row " + lastRow);
  return "SUCCESS: Row 1 headers updated and sample test row added at row " + lastRow;
}

// Aliases so clicking "Run" on any selected function works seamlessly
function setupHeaders(sheet) {
  return setupSheet();
}

function testRsvpSubmission() {
  return setupSheet();
}

// Ensures headers exist when webhooks arrive from the live website
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#7D0A0A");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
}

// Handles RSVP submissions from the wedding website
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Extract fields matching the website RSVP form
    var timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    var name = data.name || "-";
    var phone = data.phone ? "'" + data.phone : "-";
    var email = data.email && data.email !== "-" ? data.email : "-";
    
    var adults = data.adults !== undefined ? data.adults : (data.adults_count !== undefined ? data.adults_count : 1);
    var children = data.children !== undefined ? data.children : (data.children_count !== undefined ? data.children_count : 0);
    var guestCount = data.guest_count !== undefined ? data.guest_count : (Number(adults) + Number(children));
    
    var dietary = data.dietary || data.dietary_preference || "Vegetarian";
    var wedding = data.wedding || data.wedding_ceremony || "Yes";
    var attending = data.attending_events || (wedding === "Yes" ? "Wedding Ceremony" : "None");
    var note = data.note || data.warm_wishes || "-";

    // Append new row
    var row = [
      timestamp,
      name,
      phone,
      email,
      Number(adults),
      Number(children),
      Number(guestCount),
      dietary,
      wedding,
      attending,
      note
    ];
    
    sheet.appendRow(row);
    
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");
    sheet.getRange(lastRow, 5, 1, 3).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 9, 1, 1).setHorizontalAlignment("center");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "RSVP recorded successfully in Google Sheets",
      name: name,
      rowNumber: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Health check endpoint for testing in browser
function doGet(e) {
  return ContentService.createTextOutput("💍 Sreeja & Nikhil RSVP Google Sheets Webhook is ACTIVE and connected! Ready to receive RSVPs.")
    .setMimeType(ContentService.MimeType.TEXT);
}
