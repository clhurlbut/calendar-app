// declare variables 
let currentDay = $("#currentDay");
let currentDate = moment().format('LLLL');
let currentHour = moment().format("H");
let fullSchedule = $(".schedule-container");
let timeBlock = $(".time-block");


// display the current date to the header
currentDay.text(currentDate);


// make the rows responsive to time with the different
//color classes

function colorSchedule() {
    timeBlock.each(function () {
        let thisRow = $(this);
        let thisRowHour = parseInt(thisRow.attr("data-hour"));
        if (thisRowHour == currentHour) {
            thisRow.addClass("present").removeClass("past future");
        }
        if (thisRowHour > currentHour) {
            thisRow.addClass("future").removeClass("past present");
        }
        if (thisRowHour < currentHour) {
            thisRow.addClass("past").removeClass("present future");
        }
   });
}

// create an array of task objects in each row and set to local storage


// function to pull the array from localstorage and display

// function to bring up the array if there is no data in localstorage 

// start the application

$(document).ready(function(){
    colorSchedule();
    // function to call saveBtn to save to localstorage 
    $(".saveBtn").on("click", function(){
        workTask = $(this).siblings(".description").val().trim();
        console.log(workTask);
        taskHour = $(this).parent().attr("data-hour");
        console.log(taskHour);
        localStorage.setItem(taskHour, JSON.stringify(workTask));
    })
});

