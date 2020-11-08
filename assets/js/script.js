// declare variables 
let currentDay = $("#currentDay");
let currentDate = moment().format('LLLL');
let currentHour = moment().format("H");
let fullSchedule = $(".schedule-container");
let timeBlock = $(".time-block");
let workTasks = [];

// function to get an array of the hour and task 
function getTaskArray() {
    timeBlock.each(function() {
        let thisRow = $(this);
        let thisHour = parseInt(thisRow.attr("data-hour"));

        let tasksObject = {
            text: "",
            hour: thisHour,
        }
        workTasks.push(tasksObject);
    });
    localStorage.setItem("tasks", JSON.stringify(workTasks));
};

// function to save so I can call it for onclick in the document.ready
function saveTasks() {
    let hourSave = $(this).parent().attr("data-hour");
    let workTaskSave = (($(this).parent()).children("textarea")).val();
    //loop to go through the rows
    for (var i = 0; i < workTasks.length; i++){
        if (workTasks[i].hour = hourSave) {
            
            workTasks[i].text == workTaskSave;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(workTasks));
    getSchedule();
};

// make the rows responsive to time with the different
//color classes

function colorSchedule() {
    timeBlock.each(function () {
        let thisRow = $(this);
        let thisHour = parseInt(thisRow.attr("data-hour"));
        if (thisHour == currentHour) {
            thisRow.addClass("present").removeClass("past future");
        }
        if (thisHour > currentHour) {
            thisRow.addClass("future").removeClass("past present");
        }
        if (thisHour < currentHour) {
            thisRow.addClass("past").removeClass("present future");
        }
    });
}

// function to pull up the schedule objects from localstorage 
function getSchedule() {
    workTasks = localStorage.getItem("tasks");
    workTasks = JSON.parse(workTasks);

    for (var i = 0; i < workTasks.length; i++) {
        let getHour = workTasks[i].hour;
        let getTask = workTasks[i].text;
        
        $("[data-hour=" + getHour + "]").children("textarea").val(getTask);
  }
}

// in here to start manipulations once DOM is ready 
$(document).ready(function(){
    colorSchedule();
    if(!localStorage.getItem("tasks")){
        getTaskArray();
        }
    // display the current date to the header
    currentDay.text(currentDate);
    //function for changing the color in accordance to time 
    getSchedule();
    // function to call saveBtn to save to localstorage 
    fullSchedule.on("click", "button", saveTasks);
});

