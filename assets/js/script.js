// declare variables 
let currentDay = $("#currentDay");
let currentDate = moment().format("dddd, MMMM Do");


// display the current date to the header
currentDay.text(currentDate);