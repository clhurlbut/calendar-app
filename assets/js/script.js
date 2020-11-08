// declare variables 
let currentDate = moment().format('LLLL');
let currentHour = moment().format("H");
let currentDay = $("#currentDay");
let fullSchedule = $(".schedule-container");
let timeBlock = $(".time-block");
let workTasks = [];
let jumbotron = $(".jumbotron");
// function to get an array of the hour and task 
function getTaskArray() {
    // using each to go through and get the info
    timeBlock.each(function() {
        let thisRow = $(this);
        let thisHour = parseInt(thisRow.attr("data-hour"));

        let tasksObject = {
            text: "",
            hour: thisHour,
        }
        // pushing the array
        workTasks.push(tasksObject);
    });
    // saving the array to local storage, turning it into a string
    localStorage.setItem("tasks", JSON.stringify(workTasks));
};

// function to save so I can call it for onclick in the document.ready
// this is where I am having a problem so I have to double check this in 
// the morning 
function saveTasks() {
    let hourSave = $(this).parent().attr("data-hour");
    let workTaskSave = $(this).parent().children("textarea").val();
    //loop to go through the rows
    for (let i = 0; i < workTasks.length; i++){
        if (workTasks[i].hour == hourSave) {
            
            workTasks[i].text = workTaskSave;
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
// loop to go through the array of objects 
    for (var i = 0; i < workTasks.length; i++) {
        let getHour = workTasks[i].hour;
        let getTask = workTasks[i].text;
      // put the task into the correct hour using the data attribute and appending the value   
        $("[data-hour=" + getHour + "]").children("textarea").val(getTask);
  }
}

// function to clear the localstorage, create a new array, and then create the schedule off of it
// It still isn't clearing it the way I want it to in the localstorage immediately, but it is gone
// after refreshing 

// I think I fixed it with this... clear storage, then refresh browser
// I will keep trying to figure out how to clear it without refresh

function clearDay(){
    localStorage.clear();
    location.reload();
}

// document.ready to start manipulations once DOM is ready 
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
    // function to call clearBtn to clear localstorage 
    jumbotron.on("click", "button", clearDay);
    
});

