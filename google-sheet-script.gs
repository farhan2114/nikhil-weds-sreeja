/**
 * =======================================================================
 * 💍 SREEJA & NIKHIL WEDDING — GOOGLE SHEETS RSVP WEBHOOK SCRIPT
 * =======================================================================
 * 
 * INSTRUCTIONS TO UPDATE YOUR GOOGLE SHEET:
 * -----------------------------------------
 * 1. Open your Google Sheet.
 * 2. Click "Extensions" in the top menu -> "Apps Script".
 * 3. Delete any existing code in the editor, and paste this entire code.
 * 4. Click "Save" (disk icon).
 * 
 * TO TEST INSIDE APPS SCRIPT DIRECTLY:
 * ------------------------------------
 * - In the toolbar dropdown beside "Debug", select "testRsvpSubmission" or "setupHeaders".
 * - Click "Run". You will see "Execution completed" with no errors and a test row or header created!
 * 
 * TO DEPLOY / RE-DEPLOY AS WEBHOOK:
 * ---------------------------------
 * 1. Click "Deploy" (blue button at top right) -> "Manage deployments".
 * 2. Click the pencil icon (Edit) on the active deployment.
 * 3. Select Version: "New version".
 * 4. Ensure:
 *      * Execute as: "Me"
 *      * Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself")
 * 5. Click "Deploy".
 *    (If deploying for the very first time: Click "Deploy" -> "New deployment"
 *     -> Type: "Web app" -> Execute as: "Me" -> Access: "Anyone").
 * 6. Copy the Web App URL (ends with /exec).
 * 7. If the URL changed, paste it into `src/wedding.config.ts` under `googleSheetWebhookUrl`.
 * =======================================================================
 */

// Set up sheet header styling if sheet is blank or headers need initialization
function setupHeaders(sheet) {
  // If invoked directly from the Apps Script "Run" button without parameters
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }

  var headers = [
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

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#7D0A0A"); // Royal Maroon
    headerRange.setFontColor("#FFFFFF");  // White text
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    
    // Auto-fit column widths
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 150);
    }
    sheet.setColumnWidth(2, 180); // Guest Name
    sheet.setColumnWidth(8, 170); // Dietary
    sheet.setColumnWidth(11, 260); // Warm Wishes
  }
}

// Handles RSVP submissions from the wedding website
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for concurrent write safety
    lock.waitLock(10000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeaders(sheet);
    
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
    var phone = data.phone ? "'" + data.phone : "-"; // Prefix with ' so Google Sheets formats as text
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
    
    // Format the new row nicely
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");
    sheet.getRange(lastRow, 5, 1, 3).setHorizontalAlignment("center"); // Numbers centered
    sheet.getRange(lastRow, 9, 1, 1).setHorizontalAlignment("center"); // Wedding Yes/No centered

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

// Test function to run directly from Google Apps Script editor
function testRsvpSubmission() {
  var dummyPayload = {
    timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
    name: "Test Guest (Sample RSVP)",
    phone: "+1 (469) 555-0199",
    email: "guest@example.com",
    adults: 2,
    children: 1,
    guest_count: 3,
    dietary: "Vegetarian",
    wedding: "Yes",
    attending_events: "Wedding Ceremony",
    note: "Heartiest congratulations to Sreeja & Nikhil!"
  };
  
  var dummyEvent = {
    postData: {
      contents: JSON.stringify(dummyPayload)
    }
  };
  
  var result = doPost(dummyEvent);
  Logger.log("Result: " + result.getContent());
  return result.getContent();
}
