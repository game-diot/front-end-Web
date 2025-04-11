const currdate = document.querySelector(".currdate");
const datesel = document.querySelector(".dateselect");
const datepick = document.querySelector(".datepicker");
const dsMonth = datesel.querySelector(".mnthname");
const dsDays = datesel.querySelector(".days");
const prevMonth = document.querySelector(".prev-month");
const nextMonth = document.querySelector(".next-month");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDate = new Date();

function updateCalendar(date) {
  const mon = date.getMonth();
  const monname = months[mon];
  const dayname = days[date.getDay()];
  let day = date.getDate();
  const yr = date.getFullYear();
  const firstDay = new Date(yr, mon, 1).getDay();
  const daysinmon = new Date(yr, mon + 1, 0).getDate();

  currdate.textContent = `${dayname}, ${monname} ${day}, ${yr}`;
  dsMonth.textContent = monname;
  dsDays.innerHTML = "";

  days.forEach((d) => {
    dsDays.innerHTML += `<div class="dayn">${d}</div>`;
  });
  for (let j = 0; j < firstDay; j++) {
    dsDays.innerHTML += `<div class="nday"></div>`;
  }
  for (let i = 1; i <= daysinmon; i++) {
    dsDays.innerHTML += `<div class="day">${i}</div>`;
  }
  document.querySelectorAll(".day").forEach((d) => {
    d.addEventListener("click", () => {
      currentDate.setDate(parseInt(d.textContent));
      updateCalendar(currentDate);
      datepick.style.height = "40px";
    });
  });
}

updateCalendar(currentDate);

currdate.addEventListener("click", () => {
  datepick.style.height = datepick.style.height === "40px" ? "225px" : "40px";
});
prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar(currentDate);
});
nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar(currentDate);
});
