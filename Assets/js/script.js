
$(function () {

  // Initialize variables that will be used to set, get, and verify the current date 
  var today = dayjs();
  var day = today.format("D");
  var month = today.format("MM");
  var year = today.format("YYYY");
  var date = JSON.parse(localStorage.getItem("date"));

  // Sets the current date and deletes the previous schedule if called
  function setDate() {
    localStorage.clear();
    let array = JSON.stringify([day, month, year]);
    localStorage.setItem("date", array);
    date = JSON.parse(localStorage.getItem("date"));
  }

  // Checks to see if there is a date key in the localStorage and sets it if not
  if (!localStorage.getItem("date")) {
    setDate();
  } 
  
  // Checks to see if todays date is greater than the date retrieved from local storage
  function checkDate() {
    var dateStored = date[2] + date[1] + date[0];
    var dateChange = year + month + day;
    
    if (dateChange > dateStored) {
      setDate();
    }
  }

  // Calls checkDate()
  checkDate();

  // Saves the message inputted in the scheduler by the user into local storage
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function() {
    var parentId = $(this).parent().attr("id");
    var userInput = $(this).prev().val();
    localStorage.setItem(parentId, userInput);
  });

  // Various variables keeping track of the date and time to display to the front end and the different message containers
  var currentHour = today.format("H");
  var formattedDate = today.format("dddd[,] MMMM DD")
  var hourId = $("[id^=hour]");
  
  // Displays the color coded user interface according to its hourId and if it has passed the current hour
  function currentTime() {
    for (let i = 0; i < hourId.length; i++) {
      var hour = Number(hourId[i].getAttribute("id").slice(5));
      currentHour = Number(currentHour);
      if (hour < currentHour) {
        hourId[i].setAttribute("class", "row time-block past");
      } else if (hour === currentHour) {
        hourId[i].setAttribute("class", "row time-block present");
      } else {
        hourId[i].setAttribute("class", "row time-block future");
      }
    }
  }

  // Creates the messages on the page from localStorage if available
  function populateCalendar() {
    for (let i = 0; i < hourId.length; i++) {
      var hour = hourId[i].getAttribute("id");
      var hourMessage = localStorage.getItem(hour); 
      $("#" + hour).children("textarea").text(hourMessage)
    }
  }
  
  // Calls above two functions
  currentTime();
  populateCalendar();
  
  // Adds the date to the top of the page
  function addDate() {
    $("#current-day").text(formattedDate);
  }
  
  // Calls addDate() function
  addDate();
});

