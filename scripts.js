const urlSearchParams = new URLSearchParams(window.location.search);
const username = urlSearchParams.get('username');


// Display username//
const userInfoElement = document.getElementById('userInfo');
if (userInfoElement) {
    userInfoElement.textContent = `${username || 'Guest'}`;
}

// Calendar //
function createCalendar(elem, year, month) {
    let currentDate = new Date(year, month - 1, 1);
    let today = new Date(); 

    let table = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';

    for (let i = 0; i < getDay(currentDate); i++) {
        table += '<td></td>';
    }

    while (currentDate.getMonth() === month - 1) {
        let cellClass = currentDate.toDateString() === today.toDateString() ? 'current-day' : '';

        table += `<td class="${cellClass}">${currentDate.getDate()}</td>`;

        currentDate.setDate(currentDate.getDate() + 1);

        if (currentDate.getDay() === 1) {
            table += '</tr><tr>';
        }
    }

    while (currentDate.getDay() > 1) {
        table += '<td></td>';
        currentDate.setDate(currentDate.getDate() + 1);
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) {
    let day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

createCalendar(document.getElementById('calendar'), 2024, 2);

// TO DO // 
const task = [];

function createTaskBox(taskText, dueDate) {
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');
    taskBox.innerHTML = `<strong>${taskText}</strong> - Due: ${dueDate}`;
    return taskBox;
}

document.getElementById('createTaskList').addEventListener('submit', function (event) {
    event.preventDefault();
    const newTask = document.getElementById('newTask').value;
    const dueDate = document.getElementById('dueDate').value;

    task.push({ task: newTask, dueDate: dueDate });
    
    task.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    document.getElementById('taskSection').innerHTML = '';

    task.forEach((item) => {
        const taskBox = createTaskBox(item.task, item.dueDate);
        document.getElementById('taskSection').appendChild(taskBox);
    });
});




// NOTES //
const note = [];

function createNoteBox(noteText) {
    const noteBox = document.createElement('div');
    noteBox.classList.add('note-box');
    noteBox.textContent = noteText;
    return noteBox;
}

document.getElementById('createNoteList').addEventListener('submit', function (event) {
    event.preventDefault();
    const newNote = document.getElementById('newNote').value;
    note.push(newNote);
    const noteBox = createNoteBox(newNote);
    document.getElementById('noteSection').appendChild(noteBox);
});




// ERRANDS //
const errand = [];

function createErrandBox(errandText) {
    const errandBox = document.createElement('div');
    errandBox.classList.add('errand-box');
    errandBox.textContent = errandText;
    return errandBox;
}

document.getElementById('createErrandList').addEventListener('submit', function (event) {
    event.preventDefault();
    const newErrand = document.getElementById('newErrand').value;
    errand.push(newErrand);
    const errandBox = createErrandBox(newErrand);
    document.getElementById('errandSection').appendChild(errandBox);
});

// SCHEDULE //
const scheduleSection = document.getElementById('scheduleSection');

function createTaskBoxForSchedule(taskItem) {
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');
    taskBox.innerHTML = `<strong>${taskItem.task}</strong> - Due: ${taskItem.dueDate}`;
    return taskBox;
}

function updateSchedule() {
    scheduleSection.innerHTML = '';

    for (let i = 0; i < Math.min(5, task.length); i++) {
        const taskBox = createTaskBoxForSchedule(task[i]);
        scheduleSection.appendChild(taskBox);
    }
}

updateSchedule();

document.getElementById('createTaskList').addEventListener('submit', function (event) {
    event.preventDefault();
    updateSchedule();
});




