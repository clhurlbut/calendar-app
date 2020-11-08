// declare variables 
let currentDay = $("#currentDay");
let currentDate = moment().format("dddd, MMMM Do");
let fullSchedule = $(".schedule-container");
let timeBlock = $(".time-block");
let scheduleToDo = [];


// display the current date to the header
currentDay.text(currentDate);

// create an array of the task objects in each row 
function startSchedule(){
    timeBlock.each(function(){
        let thisRow = $(this)

        let taskObjects = {
            text: ""
        }
        scheduleToDo.push(taskObjects);
    });
    localStorage.setItem("eventTasks", JSON.stringify(scheduleToDo));
};

// create a loop to save all the rows to local storage 


