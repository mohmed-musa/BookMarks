var bookmarks = [];
var BookMarkName = document.getElementById("bookmarkName");
var BookMarkUrl = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;


if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}


function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].BookMarkUrl;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].BookMarkName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;


  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }


  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}


function clearInput() {
  BookMarkName.value = "";
  BookMarkUrl.value = "";
}


function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}


submitBtn.addEventListener("click", function () {
  if (
    BookMarkName.classList.contains("is-valid") &&
    BookMarkUrl.classList.contains("is-valid")
  ) {
    var bookmark = {
      BookMarkName: capitalize(BookMarkName.value),
      BookMarkUrl: BookMarkUrl.value,
    };
    swal("Good job!", "your validation was successful", "success");
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    BookMarkName.classList.remove("is-valid");
    BookMarkUrl.classList.remove("is-valid");
  }
  else {
    // swal({
    //   title: "Site Name or Url is not valid, Please follow the rules below :!",
    //   text: "fsdfdsfdsfdsfdsfdsfdsfsd",
    //   text: "fdfds",
    //   icon: "warning",
    // });
    swal({
      title: "is not validate",
      text: "your Data is Empty",
      icon: "warning",
      dangerMode: true,
    });
    
    
  }
});


function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}


function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].BookMarkUrl)) {
    open(bookmarks[websiteIndex].BookMarkUrl);
  } else {
    open(`https://${bookmarks[websiteIndex].BookMarkUrl}`);
  }
}



BookMarkName.addEventListener("input", function () {
  validate(BookMarkName, nameRegex);
});

BookMarkUrl.addEventListener("input", function () {
  validate(BookMarkUrl, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    console.log(regex)
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    console.log(regex)
  }
}

