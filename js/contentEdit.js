
// Review Editor 1.0 for creating DeepSleep.Buzz Reviews

/*
// Initialize Quill editor 
var toolbarOptions = [
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'align': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['link', 'image'],
  ['blockquote'],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],
  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor-container', {
modules: {
  toolbar: toolbarOptions    // Snow includes toolbar by default
},
placeholder: 'Compose a new Product Review...',
theme: 'snow'
});

*/

function SerializeAbstractObject() {
  var contentObj = new Object();

  // Get review in variables
  contentObj.title = document.getElementById("content-title").value;
  contentObj.author  = document.getElementById("content-author").value;
  contentObj.date = document.getElementById("content-date").value;
  contentObj.category = document.getElementById("content-category").value;
  contentObj.heroImage = document.getElementById("content-hero-image-url").value;
  contentObj.article = document.getElementById("content-article-url").value;
  contentObj.body = quill.root.innerHTML;

  return(JSON.stringify(contentObj));
}

function InstantiateReviewObject(serializedObj) {
console.log("InstantiateReviewObject")
  var contentObj = new Object(JSON.parse(serializedObj));

  // Get review in variables
  document.getElementById("content-title").value = contentObj.title;
  document.getElementById("content-author").value = contentObj.author;
  document.getElementById("content-date").value = contentObj.date;
  document.getElementById("content-category").value = contentObj.category;
  document.getElementById("content-hero-image-url").value = contentObj.heroImage;
  document.getElementById("content-article-url").value = contentObj.article;
  quill.root.innerHTML = contentObj.body;

}

async function SubmitAsset() {
  // Make a POST call to  https://sleepnetnodejs.uw.r.appspot.com/api/uploadProductPhoto
  // With the data 
  //  {file: File; keywords: string }

  var fn = document.getElementById("asset-upload-image").src;
  var title = document.getElementById("asset-name").value;

  fetch("https://sleepnetnodejs.uw.r.appspot.com/api/uploadProductPhoto", {   
    method: "POST",
    body: JSON.stringify({
        file: fn,
        keywords: title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  // Displaying results to console
  .then(json => console.log(json));
}

// Submit review to the server
function SubmitReview() {

  var reviewObj = SerializeReviewObject();

  console.log('SUBMITTING REVIEW OBJ=' + JSON.stringify(reviewObj));
}

// Displays review in another window with the styling and frame of our website
function PreviewReview() {
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
  window.open("https://deepsleep.buzz/", "DeepSleep Review Preview", params)
}

function ShowHTML() {
console.log("ShowHTML");
  var reviewTextHTML = quill.root.innerHTML;
  document.getElementById('html-editor').value = reviewTextHTML;
}

function SaveHTML() {
  console.log("SaveHTML");
  quill.root.innerHTML = document.getElementById('html-editor').value;
}

function ChangeModes(mode) {
  // Modes = 0 for Preview, 1 for Review, 2 for Abstract, 3 for Assets
  console.log("ChangingModes....");

  const displayBlockFileName = ["previewEdit.html", "reviewEdit.html", "abstractEdit.html", "assetEdit.html"];
  // Switch to the new page...
  window.location = displayBlockFileName[mode];

}

function LoadEditorHTML(fileName) {
  console.log("Creating Editor Block using file='" + fileName + "'");

  document.getElementById("asset-editor-body").innerHTML='<object type="text/html" data="reviewEdit.html"></object>';
}

function ChangeRangeValue(textID, rangeID) {
  console.log("ChangeRangeValue()");
  document.getElementById(textID).value = document.getElementById(rangeID).value
}

function ChangeTextValue(textID, rangeID) {
  console.log("ChangeTextValue()");
  document.getElementById(rangeID).value = document.getElementById(textID).value;
}

function initializePage(mode) {
  // Asset Viewer Prefill
  if (mode == 3) {
    FillAssetGallery();
//    TestFill();
}
}

async function TestFill(token, model, dayOffset) {
  var dsData = null;  
  console.log("fetchHypnoData()");

  const res = await fetch('https://sleepnetnodejs.uw.r.appspot.com/api/productPhotoURL/all', {
  })
    .then (res => res.json())
    .then(dataBack =>  { 
       console.log("TestFill=" + JSON.stringify(dataBack));
                          if (dataBack) {
                            dsData = dataBack;
                          }
                       });

    return(dsData);
}



// Call Server API to get static images
async function FillAssetGallery() {
  // Call https://sleepnetnodejs.uw.r.appspot.com/api/productPhotoURL/all
  const assetDataArr = await FetchAssetData();
  for (i=0; i<assetDataArr.length; i++) {
    console.log("KeyWord/URL=(" + assetDataArr[i].keywords + "," + assetDataArr[i].url + ")");
  }
  ShowAssetImages(assetDataArr);
}

function ShowAssetImages(assetDataArr) {
  var buf = "<div class='card-group'>";
  for (i=0; i<assetDataArr.length; i++) {
    buf += "<div class='card text-center' style='width: 18rem;'>";
    buf += "<img src='" + assetDataArr[i].url + ">";  
    buf += "<div class='card-body'>";  
    buf += "<h5 class='card-title'>" + assetDataArr[i].keywords + "</h5>";
    buf += "<h6 class='card-subtitle mb-2 text-muted'>" + assetDataArr[i].url + "</h6>";
    buf += "</div>";  
    buf += "</div>";  
  }
  buf += "</div>";
  document.getElementById('asset-editor-body').innerHTML = buf;  
  console.log("COMPLETED DRAWING ASSETS!!!")
}


async function FetchAssetData() {
  var dsData = null;  
  console.log("fetchAssetData()");

  const res = await fetch('https://sleepnetnodejs.uw.r.appspot.com/api/productPhotoURL/all', {
    })
    .then (res => res.json())
    .then(dataBack =>  { 
       console.log("AssetData:" + JSON.stringify(dataBack));
                          if (dataBack) {
                            dsData = dataBack;
                          }
                       });
    return(dsData);
}



// Simulate a press on the file upload element
// Janky but that's the way HMTML file upload is I'm afraid!
function TriggerFileInputEl() {
  // Fake a click on the file upload button
  document.getElementById('file-input').click();

}

function ShowHeroImage() {
  console.log("Show hero image")
  document.getElementById('content-hero-image').src = document.getElementById('content-hero-image-url').value;
}

function SaveToLocalFile(extension) {
//  var fileContent = quill.root.innerHTML;
console.log("Saving to local file");
  var fileContent = SerializeAbstractObject();

  var bb = new Blob([fileContent ], { type: 'text/plain' });
  var a = document.createElement('a');
  a.download = "download" + extension;
  a.href = window.URL.createObjectURL(bb);
  a.click();
  a.remove();
}


function ShowHTMLCheck() {
var checkValue = document.getElementById('showHTML').value;
console.log("Check value=" + checkValue);

if (checkValue == "NOHTML") {
  // Show the HTML pane
  document.getElementById("html-container").style.display = "block";
  document.getElementById("resize-widget").style.display = "block";
  document.getElementById("editor-container").style.height = "50vh";
  checkValue = "HTML";
}
else {
  // Hide the HTML pane
  document.getElementById("html-container").style.display = "none";
  document.getElementById("resize-widget").style.display = "none";
  document.getElementById("editor-container").style.height = "70vh";
  checkValue = "NOHTML";
}
document.getElementById('showHTML').value = checkValue;
}

// Grab and display asset locally in prep to upload to server
function AssetUpload() {
  console.log("Entered AssetUpload...");   
  var fn = document.getElementById('file-input').files[0];
             
  var fr=new FileReader();
  fr.onload=function() {
    if (fr.result) {
      // Now load the image
      document.getElementById("asset-upload-image").src = fr.result;
     }
  }           
  // Start reading file asynchronously
  fr.readAsDataURL(fn);
}

function FileInput() {
console.log("Entered FileInput...");   
var fn = document.getElementById('file-input').files[0];
           
var fr=new FileReader();
fr.onload=function() {
  // when file is loaded, load it into Quill
  if (fr.result) {
    InstantiateReviewObject(fr.result);
    
    // Load data into Quill
//    quill.root.innerHTML =fr.result;
    // Load HTML into text editor
//    document.getElementById('html-editor').value = quill.root.innerHTML;

   }
}           
// Start reading file asynchronously
fr.readAsText(fn);
}

function ResizeReviewWindow() {
  console.log("Resizing Review Window...")
}