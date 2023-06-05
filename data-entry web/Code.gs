var sheetName = "Data"; //Replace the "Data" with your data sheet name

function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

/* @Include JavaScript and CSS Files */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function uploadFiles(formObject) {
  try {
    if (formObject.event_k == "CEO Class") {
      var folderID = "1jSr7-tpB-qz74NCJq_cTdXpKZ3hXckz5"; 
    } 

    // salin kodingan dari baris ke-27 - ke-29 dan ganti
    // nama Business Plan menjadi nama folder baru
    // nilai dari folderID di dapatkan dari url foldernya, contoh :
    // https://drive.google.com/drive/u/2/folders/1rOAght0A3yd21C1Iz1Gjx9M1k0jEDVu6
    // salin nilai unik terakhir setelah tanda "/"
    else if (formObject.event_k == "Business Plan"){
      var folderID = "1rOAght0A3yd21C1Iz1Gjx9M1k0jEDVu6"; 
    } 
    else if (formObject.event_k == "Kelas Staf Karyawan Outlet"){
      var folderID = "18NJQIR9qVFbVX-Ocu6Qu1oYA-UqbGnJP"; 
    } 
    
    else if (formObject.event_k == "Dokumen Pendukung"){
      var folderID = "14VDGujY8iv0-W10q9S_Sjv2TCiwR1RRa"; 
    } 
    else if (formObject.event_k == "E-Magz"){
      var folderID = "11FCgqenX0fj6ntiE3N_fOAbKmIKtCs0Y"; 
    } else if (formObject.event_k == "E-Book"){
      var folderID = "1VqpHlhrGIGwWgAu79Pceqf70wgLKCd-z"; 
    } else if (formObject.event_k == "FMC"){
      var folderID = "1krkC3a73EGo7wcckNVOkl9awN4oqGUhY"; 
    } else if (formObject.event_k == "FOC"){
      var folderID = "1uG_vOAvQwlfhORVH45IKfbn5V0gH7G6d"; 
    } else if (formObject.event_k == "Foodizz Insight"){
      var folderID = "1xWZvZhaMUcvSYxk6zdTPG-LMF-25z_xH"; 
    } else if (formObject.event_k == "Free Webinar"){
      var folderID = "1qaj2JAO3qU1AdWA2-R9G9zVzcOZFp8ea"; 
    } else if (formObject.event_k == "Internal Kurikulum"){
      var folderID = "1iCBxMpk7XYaQo6-txSE4x3LPvawNwI6q"; 
    } else if (formObject.event_k == "Kelas Manager/Supervisor Cafe & Restoran"){
      var folderID = "1ApJu2e-sh_iNRuAaPOU0BFlqCsF_X3QP"; 
    } else if (formObject.event_k == "KSB") {
      var folderID = "10Kr6kv-GGcEwywjC3V0IMfiwnw7NtXCk"; 
    } else if (formObject.event_k == "MBK"){
      var folderID = "1wfzUucFHy6koubNcw-s1aZOMWBIUfGXY"; 
    } else if (formObject.event_k == "Partnership"){
      var folderID = "1iPVbMNSb60I-tQXqCRADv59orTH3C9C8"; 
    } else if (formObject.event_k == "Riset"){
      var folderID = "1NkaJ_zl6HkCJrmJ9LyDq63tKLCeIl1K0"; 
    } else if (formObject.event_k == "SBK Offline"){
      var folderID = "1SgT8BJ7KgaIrrhcXBkhfdJvob4IksVWf"; 
    } else if (formObject.event_k == "SBK Online"){
      var folderID = "1jirPyuoFlUHLi72bWvemjfBoD3tBlvVY"; 
    } else if (formObject.event_k == "Special Event"){
      var folderID = "1zf1v1yYVoIpSAUE_j_4M4pV7fOnD_xt_"; 
    } 

    var folder = DriveApp.getFolderById(folderID);
    var namaProgram = formObject.sub_program;
    var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    var fileUrl = "";
    var fileName = "";

    try {
      var folderBaru = folder.getFoldersByName(namaProgram).next();
    } catch(e) {
      var folderBaru = folder.createFolder(namaProgram);
    }

    if (formObject.myFile) {
      var blob = formObject.myFile;
      var file = folderBaru.createFile(blob);
      file.setDescription("Uploaded by " + formObject.name_);
      fileUrl = file.getUrl();
      fileName = file.getName();
    } else{
      fileUrl = "Record saved without a file";
    }

  //Saving records to Google Sheet
    event_name = String(formObject.event_k).replace(/\s/g, "").trim();
    sub_event = String(formObject.sub_program).replace(/\s/g, "").trim();
    file_name = String(fileName).replace(/\s/g, "").trim();
    file_url = String(fileUrl).replace(/\s/g, "").trim();
    sheet.appendRow([
      formObject.name_,
      event_name,
      sub_event,
      formObject.pilar,
      file_name,
      file_url,
      Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd'T'HH:mm:ss'Z'")]);
      
    // Return the URL of the saved file
    return fileUrl;
    
  } catch (error) {
    return error.toString();
  }
}