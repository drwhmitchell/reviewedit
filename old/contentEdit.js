
// Review Editor 1.0 for creating DeepSleep.Buzz Reviews


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

var quill;

function InitializeQuill() {
  quill = new Quill('#editor-container', {
    modules: {
      toolbar: toolbarOptions    // Snow includes toolbar by default
    },
    placeholder: 'Compose a new Product Review...',
    theme: 'snow'
  })
}

function SerializeReviewObject() {
  var reviewObj = new Object();

  // Get review in variables
  reviewObj.title = document.getElementById("review-title").value;
  reviewObj.category = document.getElementById("category-select").value;
  reviewObj.author  = document.getElementById("review-author").value;
  reviewObj.date = document.getElementById("review-date").value;
  reviewObj.summary = document.getElementById("review-summary").value;
  reviewObj.heroImage = document.getElementById("review-hero-image-url").value;
  reviewObj.rating = document.getElementById("review-rating-text").value;
  reviewObj.score = document.getElementById("review-score-select").value;
  reviewObj.deep = document.getElementById("review-efficacy-deep").value;
  reviewObj.rem = document.getElementById("review-efficacy-rem").value;
  reviewObj.onset = document.getElementById("review-efficacy-onset").value;
  reviewObj.efficiency = document.getElementById("review-efficacy-efficiency").value;
  reviewObj.wakefulness = document.getElementById("review-efficacy-wakefulness").value;
  reviewObj.accuracy = document.getElementById("review-efficacy-accuracy").value;
  reviewObj.vendorName1 = document.getElementById("review-vendorname-1").value;
  reviewObj.vendorLink1 = document.getElementById("review-link-1").value;
  reviewObj.vendorPrice1 = document.getElementById("review-price-1").value;
  reviewObj.vendorName2 = document.getElementById("review-vendorname-2").value;
  reviewObj.vendorLink2 = document.getElementById("review-link-2").value;
  reviewObj.vendorPrice2 = document.getElementById("review-price-2").value;
  reviewObj.body = quill.root.innerHTML;

  return(JSON.stringify(reviewObj));
}

function InstantiateReviewObject(serializedObj) {
  var reviewObj = new Object(JSON.parse(serializedObj));

  // Get review in variables
  document.getElementById("review-title").value = reviewObj.title;

  document.getElementById("category-select").value = reviewObj.category;
  document.getElementById("review-author").value = reviewObj.author;
  document.getElementById("review-date").value = reviewObj.date;
  document.getElementById("review-summary").value = reviewObj.summary;
  document.getElementById("review-hero-image-url").value = reviewObj.heroImage;
  document.getElementById("review-rating-text").value = reviewObj.rating;
  document.getElementById("review-score-select").value = reviewObj.score;
  document.getElementById("review-efficacy-deep").value = reviewObj.deep;
  document.getElementById("review-efficacy-rem").value = reviewObj.rem;
  document.getElementById("review-efficacy-onset").value = reviewObj.onset;
  document.getElementById("review-efficacy-efficiency").value = reviewObj.efficiency;
  document.getElementById("review-efficacy-wakefulness").value = reviewObj.wakefulness;
  document.getElementById("review-efficacy-accuracy").value = reviewObj.accuracy;
  document.getElementById("review-vendorname-1").value = reviewObj.vendorName1;
  document.getElementById("review-link-1").value = reviewObj.vendorLink1;
  document.getElementById("review-price-1").value = reviewObj.vendorPrice1;
  document.getElementById("review-vendorname-2").value = reviewObj.vendorName2;
  document.getElementById("review-link-2").value = reviewObj.vendorLink2;
  document.getElementById("review-price-2").value = reviewObj.vendorPrice2;
  quill.root.innerHTML = reviewObj.body;

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

  const displayBlockFileName = ["preview.html", "reviewEdit.html", "abstract.html", "assets.html"];
  LoadEditorHTML(displayBlockFileName[displayBlockFileName]);
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

function initializePage() {
  // Force a mode change button press simulation to load the review editor
//  ChangeModes(1);
//  InitializeQuill();

/* var assetEdEl = document.getElementById("asset-editor-body");
  var content = document.createElement("html");
  content.type = "text/html";
  content.ATTRIBUTE_NODE
  assetEdEl.appendChild("reviewEdit.html");
*/



}

function ShowHeroImage() {
  console.log("Show hero image")
  document.getElementById('hero-image').src = document.getElementById('hero-image-link').value;
}

function SaveToLocalFile() {
//  var fileContent = quill.root.innerHTML;
  var fileContent = SerializeReviewObject();

  var bb = new Blob([fileContent ], { type: 'text/plain' });
  var a = document.createElement('a');
  a.download = 'download.rvw';
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


function FileInput() {
console.log("Entered FileInput...");   
var fn = document.getElementById('file-upload').files[0];
           
var fr=new FileReader();
fr.onload=function() {
  // when file is loaded, load it into Quill
  if (fr.result) {
    InstantiateReviewObject(fr.result);
/*    
    // Load data into Quill
    quill.root.innerHTML =fr.result;
    // Load HTML into text editor
    document.getElementById('html-editor').value = quill.root.innerHTML;
    // Populate Title if there is a <Title> tag...
    PopulateTitle(document.getElementById("review-title"), fr.result);
  */
   }
}           
// Start reading file asynchronously
fr.readAsText(fn);
}

// Looks through htmlStream for a <Title> tag and if it finds one, then makes then uses that to populate the title field
function PopulateTitle(titleEl, htmlStream) {
var titleText = "";
var titleTagPos = htmlStream.search(/<!-- TITLE=/i);
console.log("Title position is:" + titleTagPos);
if (titleTagPos != -1) {
  // Found a title tag
  var clip = htmlStream.slice(titleTagPos);
  var titleStartPos = clip.search('"') + 1;
  clip = clip.slice(titleStartPos);
  var titleEndPos = clip.search('"');
  titleText = clip.slice(0, titleEndPos);
}
titleEl.value = titleText;
}

function ResizeReviewWindow() {
  console.log("Resizing Review Window...")
}