// declaring all the variables at the top
// using moment.js to get the date, I wanted to show the time and be INTL friendly
let currentDate = moment().format('LLLL');
// using moment.js to get the current hour to compare it against the data-hour attribute
let currentHour = moment().format("H");
// jquery selectors 
let currentDay = $("#currentDay");
let fullSchedule = $(".schedule-container");
let timeBlock = $(".time-block");
let jumbotron = $(".jumbotron");
// empty array to push into
let workTasks = [];
// function to get an array of the hour and task 
function getTaskArray() {
    // using each to go through and get the info
    timeBlock.each(function () {
        // using this to refer to the timeBlock
        let thisRow = $(this);
        // parsing the string into an integer with the attribute 
        let thisHour = parseInt(thisRow.attr("data-hour"));
// creating objects in the array 
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
    // 
    let hourSave = $(this).parent().attr("data-hour");
    let workTaskSave = $(this).parent().children("textarea").val().trim();
    //loop to go through the rows 
    for (let i = 0; i < workTasks.length; i++) {
        if (workTasks[i].hour == hourSave) {

            workTasks[i].text = workTaskSave;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(workTasks));
    getSchedule();
};

// function to pull up the schedule objects from localstorage 
function getSchedule() {
    workTasks = localStorage.getItem("tasks");
    workTasks = JSON.parse(workTasks);
    // loop to go through the array of objects 
    for (var i = 0; i < workTasks.length; i++) {
        // getting the hour from the array
        let getHour = workTasks[i].hour;
        // getting the text from the array
        let getTask = workTasks[i].text;
        // put the task into the correct hour using the data attribute and appending the value   
        $("[data-hour=" + getHour + "]").children("textarea").val(getTask);
    }
}
// using the data-hour attribute and moment.js to determine the color of EACH row (timeblock)
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

// Function to clear local storage and refresh the browser/clear the tasks

function clearDay() {
    localStorage.clear();
    location.reload();
}

// document.ready to start manipulations once DOM is ready 
$(document).ready(function () {
    // display the current date
    currentDay.text(currentDate);
    // run function to color the schedule
    colorSchedule();
    // check for no local storage, otherwise load up empty array 
    if (!localStorage.getItem("tasks")) {
        getTaskArray();
    }
    //function to push the local storage 
    getSchedule();
    // function to call saveBtn to save to localstorage 
    fullSchedule.on("click", "button", saveTasks);
    // function to call clearBtn to clear localstorage 
    jumbotron.on("click", "button", clearDay);

});

