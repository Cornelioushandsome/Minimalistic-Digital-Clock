const timezoneSelecter = document.getElementById("timezone");
const clockTime=document.getElementById("clock");
const dayTime = document.getElementById("day");
const addTaskButton = document.getElementById("add-task-button");
const taskForm = document.getElementById("task-form");
const taskSubmitButton = document.getElementById("taskSubmit");
const taskName = document.getElementById("taskName");
//stopwatch
const stopwatchButton = document.getElementById("stopwatch-button");
const stopwatchTime= document.getElementById("stopwatch-time");
const stopwatchStartButton = document.getElementById("stopwatch-start");
const stopwatchStopButton = document.getElementById("stopwatch-stop");
const stopwatchResetButton = document.getElementById("stopwatch-reset");
const stopwatchContainer = document.getElementById("stopwatch-container");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September", "October", "November", "December"];


stopwatchButton.addEventListener("click", () =>{
    stopwatchContainer.classList.toggle("hidden");
});

addTaskButton.addEventListener("click", () =>{
    taskForm.classList.toggle("hidden");
});

function toTwelveHour(time){
    let timeArray = time.split(":");
    let hours = (parseInt(timeArray[0], 10) % 12 || 12).toString();
    let minutes = (parseInt(timeArray[1], 10)).toString();
    hours = hours.padStart(2,0);
    minutes = minutes.padStart(2,0);
    const meridian = parseInt(timeArray[0], 10)>= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${meridian}`;
}

taskSubmitButton.addEventListener("click", () => {
    let start = document.getElementById("startTime").value;
    let end = document.getElementById("endTime").value;
    const name = document.getElementById("taskName");
    if(!start || !end || !name.value.trim()){
        window.alert("Please fill out all of the fields");
        return;
    }
    console.log(`"${name.value}" task from ${toTwelveHour(start)} to ${toTwelveHour(end)}`);
    taskForm.classList.add("hidden");
});

function getTimezone(){
    const timezone=new Date().toLocaleTimeString("en-us", {timeZoneName: "short"}).split(" ")[2];
    timezoneSelecter.textContent=timezone;
}

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    const meridian = hours >= 12 ? "PM" : "AM";
    hours = hours %12 || 12;
    hours = hours.toString().padStart(2, 0);

    const day = now.getDate();
    const month=months[now.getMonth()];
    const year= now.getFullYear();
    const dayOfWeek = weekdays[now.getDay()];

    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const timeString=`${hours}:${minutes}:${seconds} ${meridian}`;
    const dayString = `${dayOfWeek}, ${month} ${day}, ${year}`;

    clockTime.textContent=timeString;
    dayTime.textContent=dayString;
}

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

stopwatchStartButton.addEventListener("click", ()=>{
    if(!isRunning){
        startTime=Date.now() - elapsedTime;
        timer = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
});

stopwatchStopButton.addEventListener("click", ()=>{
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now()-startTime;
        isRunning=false;
    }
});

stopwatchResetButton.addEventListener("click", ()=>{
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    stopwatchTime.textContent = "00:00:00:00";
});
function updateStopwatch(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000*60) %60);
    let seconds = Math.floor(elapsedTime / 1000%60);
    let milliseconds = Math.floor(elapsedTime % 1000/10);

    hours = hours.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    seconds = seconds.toString().padStart(2, 0);
    milliseconds = milliseconds.toString().padStart(2, 0);    

    stopwatchTime.textContent= `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

getTimezone();
updateClock();
setInterval(updateClock, 1000);





