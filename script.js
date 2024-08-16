const calendarDates = document.getElementById('calendarDates');
const monthElement = document.getElementById('month');
const yearSelect = document.getElementById('yearSelect');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();

function populateYearSelect() {
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    yearSelect.value = currentDate.getFullYear();
}

function renderCalendar() {
    const year = parseInt(yearSelect.value);
    const month = currentDate.getMonth();

    monthElement.textContent = months[month];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    calendarDates.innerHTML = '';
    for (let i = firstDayOfMonth; i > 0; i--) {
        const day = document.createElement('div');
        day.textContent = lastDateOfPrevMonth - i + 1;
        day.classList.add('inactive');
        calendarDates.appendChild(day);
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        if (i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            day.classList.add('active');
        }
        calendarDates.appendChild(day);
    }
    const totalCells = calendarDates.childElementCount;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('inactive');
        calendarDates.appendChild(day);
    }
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar();
}

function changeYear() {
    currentDate.setFullYear(parseInt(yearSelect.value));
    renderCalendar();
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));
yearSelect.addEventListener('change', changeYear);

populateYearSelect();
renderCalendar();
