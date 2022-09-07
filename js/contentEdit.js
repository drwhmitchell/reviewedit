
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

const DUMMY_ASSETS = 0;
const dummyAssetData = '[{"id":1,"uuid":"762173b6-481f-4d32-83c7-802f289f8215","url":"https://storage.googleapis.com/sleepnetnodejs.appspot.com/762173b6-481f-4d32-83c7-802f289f8215.png","keywords":"test1","creationDate":"2022-08-28T07:33:53.306Z","userID":4},{"id":2,"uuid":"f15bf62c-a90e-4a00-82ea-3704aafc7b65","url":"https://storage.googleapis.com/sleepnetnodejs.appspot.com/f15bf62c-a90e-4a00-82ea-3704aafc7b65.png","keywords":"test12","creationDate":"2022-08-28T07:56:55.535Z","userID":4},{"id":3,"uuid":"6e6dcacc-9488-42f5-ae67-35db8beca1de","url":"https://storage.googleapis.com/sleepnetnodejs.appspot.com/6e6dcacc-9488-42f5-ae67-35db8beca1de.png","keywords":"fdsfsd","creationDate":"2022-08-28T07:58:22.115Z","userID":4},{"id":4,"uuid":"83df5429-be4a-4cf5-8e34-15ae9f4dd595","url":"https://storage.googleapis.com/sleepnetnodejs.appspot.com/83df5429-be4a-4cf5-8e34-15ae9f4dd595.jpg","keywords":"Zinus","creationDate":"2022-09-05T05:13:36.831Z","userID":4},{"id":5,"uuid":"d35d52b9-dd32-4307-a28e-4e8969c337c5","url":"https://storage.googleapis.com/sleepnetnodejs.appspot.com/d35d52b9-dd32-4307-a28e-4e8969c337c5.png","keywords":"test hello testin12","creationDate":"2022-09-06T19:15:29.823Z","userID":4}]';

/*
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
*/

async function SubmitAsset() {
  var dsData = null;  
  console.log("SubmitAsset()");

//  const body = {file: document.getElementById("asset-upload-image").src, keywords : document.getElementById("asset-name").value};

  let data = new FormData();
  data.append('title', document.getElementById("asset-title").value);
  data.append('keywords', document.getElementById("asset-keywords").value);
  data.append('altText', document.getElementById("asset-altText").value);
  data.append('file', document.getElementById('file-input').files[0]);
console.log("SubmitAsset() with FileName='" + document.getElementById('file-input').files[0].name + "'");


  const res = await fetch('https://sleepnetnodejs.uw.r.appspot.com/api/uploadProductPhoto', {
    method: "POST",
    body: data
    })
    .then (res => res.json())
    .then(dataBack =>  { 
       console.log("Data Back from POST:" + dataBack);
       // Now refresh the Assets displayed
       FillAssetGallery();
                       });
}




/*
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
*/

function ChangeModes(mode) {
  // Modes = 0 for Preview, 1 for Review, 2 for Abstract, 3 for Assets
  console.log("ChangingModes....");

  const displayBlockFileName = ["previewEdit.html", "reviewEdit.html", "abstractEdit.html", "assetEdit.html"];
  // Switch to the new page...
  window.location = displayBlockFileName[mode];

}

/*
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
*/

function initializePage(mode) {
  // Asset Viewer Prefill
  if (mode == 3) {
    FillAssetGallery();
    HideSubmitButton();
  }
}

function HideSubmitButton() {
  document.getElementById('submit-button').style.visibility = 'hidden';
}

function ShowSubmitButton() {
  document.getElementById('submit-button').style.visibility = 'visible';
}

function FillAssetName(fn) {
  document.getElementById('asset-title').value = fn.split(".")[0];
}

/*
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
*/


// Call Server API to get static images
async function FillAssetGallery() {
  // Call https://sleepnetnodejs.uw.r.appspot.com/api/productPhotoURL/all

  if (DUMMY_ASSETS) {
console.log("DUMMY IMAGE ASSETS!!!!!!");
    ShowAssetImages(JSON.parse(dummyAssetData));
  } else {
console.log("LIVE IMAGE ASSETS!!!!!!");
    const assetDataArr = await FetchAssetData();
  }
}

function ShowAssetImages(assetDataArr) {


 // var buf ='<div class="row row-cols-3 row-cols-md-2 g-4">';
var buf = '<div class="row row-cols-4 row-cols-md-2 g-4">';

  for (i=0; i<assetDataArr.length; i++) {
//    buf += '<div class="col">';
 //   buf += '<div class="card">';

 /*
    buf += '<div class="col-auto mb-3">';
    buf += '<div class="card" style="width: 30rem; height: 20rem";>';
    buf += '<img class="card-img-top" style="text-align: center; width: 10rem; height: 14rem" src="' + assetDataArr[i].url + '" alt="Card Image" style="width:100">';
    buf = buf + '<div class="card-body style="width: 11rem; height: 10rem">';
    buf += "<h5 class='card-title'>" + assetDataArr[i].title + "</h5>";
    buf += "<h6 class='card-subtitle'>" + assetDataArr[i].altText + "</h6>";
    buf += "<h6 class='card-subtitle'>" + assetDataArr[i].keywords + "</h6>";
    buf += "<h6 class='card-subtitle text-muted'>" + assetDataArr[i].url + "</h6>";
    buf += + '</div></div></div>';
*/
    buf += '<div class="card" style="width: 30rem; height: 20rem"; margin-x>';
    buf += '<img class="card-img-top" style="text-align: center; width: 10rem; height: 14rem" src="' + assetDataArr[i].url + '" alt="Card Image" style="width:100">';
    buf += "<div class='card-body'>";  
    buf += "<h5 class='card-title' style='tex-align: center'>" + assetDataArr[i].title + "</h5>";
    buf += "<h6 class='card-subtitle'>" + assetDataArr[i].altText + "</h6>";
    buf += "<h6 class='card-subtitle'>" + assetDataArr[i].keywords + "</h6>";
    buf += "<h6 class='card-subtitle text-muted'>" + assetDataArr[i].url + "</h6>";
    buf += "</div>";  
    buf += "</div>";  


 //   buf += "</div>";  
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
                            assetDataArr = dataBack;
                            for (i=0; i<assetDataArr.length; i++) {
                              console.log("KeyWord/URL=(" + assetDataArr[i].keywords + "," + assetDataArr[i].url + ")");
                            }
                            ShowAssetImages(assetDataArr);
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

/*
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
*/
/*
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
*/

// Grab and display asset locally in prep to upload to server
function AssetUpload() {
  console.log("Entered AssetUpload...");   
  var fn = document.getElementById('file-input').files[0];
  var fr=new FileReader();
  fr.onload=function() {
    if (fr.result) {
      // Now load the image
      document.getElementById("asset-upload-image").src = fr.result;
      FillAssetName(fn.name);
      ShowSubmitButton();
     }
  }           
  // Start reading file asynchronously
  fr.readAsDataURL(fn);
}
/*
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

*/