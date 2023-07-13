// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  var today = dayjs();
  var day = today.format("D");
  var month = today.format("M")
  var year = today.format("YYYY");

  if (!localStorage.getItem("date")) {
    let array = JSON.stringify([day, month, year])
    localStorage.setItem("date", array);
  } 

  var date = JSON.parse(localStorage.getItem("date"));

  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function() {
    var parentId = $(this).parent().attr("id");
    var userInput = $(this).prev().val();
    localStorage.setItem(parentId, userInput);
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var today = dayjs();
  var tomorrow = dayjs("2023-07-13");
  var hour = today.format("H");
  var day = today.format("D");
  var month = today.format("M")
  var year = today.format("YYYY");
  var date = today.format("dddd[,] MMMM DD")
  var unixD = today.unix();
  console.log("day: ", day);
  console.log("Month: ", month);
  console.log(year);
  console.log("Today: ", today);
  console.log("Tomorrow: ", tomorrow);
  console.log(today > tomorrow);
  console.log("unix date: ", unixD);
  console.log(hour);
  console.log(date);
  var hourId = $("[id^=hour]");
  
  function currentTime() {

    for (let i = 0; i < hourId.length; i++) {
      var currentHour = Number(hourId[i].getAttribute("id").slice(5));
      console.log(currentHour);
      if (currentHour < hour) {
        hourId[i].setAttribute("class", "row time-block past");
      } else if (currentHour === hour) {
        hourId[i].setAttribute("class", "row time-block present");
      } else {
        hourId[i].setAttribute("class", "row time-block future");
      }
    }
  }

  currentTime();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function populateCalendar() {

    for (let i = 0; i < hourId.length; i++) {
      var currentHour = hourId[i].getAttribute("id");
      var hourMessage = localStorage.getItem(currentHour); 
      $("#" + currentHour).children("textarea").text(hourMessage)

    }
  }

  populateCalendar();
  // TODO: Add code to display the current date in the header of the page.

  function addDate() {
    $("#currentDay").text(date);
  }
  addDate();
});
console.log(localStorage);

