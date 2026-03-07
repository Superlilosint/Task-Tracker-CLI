#!/usr/bin/env node
const fs = require("fs");
const path = require("path");


const taskFilePath = path.join(__dirname, "tasks.json"); // task-tracker-cli/tasks.json

function readTasks() {
    if(fs.existsSync(taskFilePath)) {
        const data = fs.readFileSync(taskFilePath, "utf-8");
        return JSON.parse(data);
    }
    return [];
}

function writeTasks(task) {
    fs.writeFileSync(taskFilePath, JSON.stringify(task), 'utf-8');
    console.log("successfully written");
}

function compareNumber(a, b) {
    return a - b; //ascending order
}

function getNextId(tasks) {

    const ids = tasks.map((task) => task.id); // returns the array of id 
    ids.sort(compareNumber); // sort the array of id in ascending order
    let nextId = 1; 
    for(id of ids) { //loops through the ids 
        if(id !== nextId) { //check if id is not equal to nextId then break the loop, eg: 3 !== 2 => true break the loop
            break;
        }
        nextId = nextId + 1;
    }
    return nextId;
}

// Function to add a new task
function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: getNextId(tasks),
    description: description,
    status: "todo",
    createdAt: Date.now()
  };

  tasks.push(newTask);
  writeTasks(tasks);
  console.log(
    `Task added successfully! (ID: ${newTask.id})`
  );
}

//Function to update a new task 
function updateTask(ids, description) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(ids)); // we shouldn't use === here otherwise undefined answer or use parseInt

    if(task) {
        task.description = description;
        task.updatedAt = Date.now();
        console.log(`Task added successfully! (ID: ${task.id} and UpdateAt: ${task.updatedAt})`);
    } else {
        console.log(`This ${ids} doesn't exist at all!!`)
    }
}

const arg = process.argv.slice(2);

switch (arg[0]) {
    case "add":
        const task = arg[1]; 
        console.log("Add command is activated!!");
        addTask(task);
        break;

    case "update": 
        const [command, id, description] = arg;
        console.log("Update command is activated!!");
        updateTask(id, description);
        break;
    default:
        console.log(`Sorry, we don't have that command !!`);
        break;
}