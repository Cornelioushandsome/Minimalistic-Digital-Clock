const timezoneSelecter = document.getElementById("timezone");
const clockTime=document.getElementById("clock");
const dayTime = document.getElementById("day");


const weekdays = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September", "October", "November", "December"];

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


getTimezone();
updateClock();
setInterval(updateClock, 1000);

