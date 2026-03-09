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

function appendTask(task) {
    fs.appendFileSync(taskFilePath, JSON.stringify(task), 'utf-8')
    console.log("Appened successfully!!")
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

//Function to update a task 
function updateTask(ids, description) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(ids)); // we shouldn't use === here otherwise undefined answer or use parseInt

    if(task) {
        task.description = description;
        task.updatedAt = Date.now();
        writeTasks(tasks); 
        console.log(`Task added successfully! (ID: ${task.id} and UpdateAt: ${task.updatedAt})`);
    } else {
        console.log(`This ${ids} doesn't exist at all!!`)
    }
}

//Function to delete a task
function deleteTask(ids) {
    const tasks = readTasks();

    const remainTask = tasks.filter(obj => obj.id !== parseInt(ids));

    if(remainTask.length < tasks.length) {
        writeTasks(remainTask);
        console.log(`Successfully deleted ${ids}`);
    } else {
        console.log(`This id ${ids} doesn't exists!!`);
    }
}

//Function mark-in-progress
function MarkInProgress(ids) {
    const tasks = readTasks();
    const markedTask = tasks.find(t => t.id === parseInt(ids));
    
    if(markedTask) {
        markedTask.status = "in-progress";
        writeTasks(tasks);
        console.log(`Successfully marked the progress for this ${markedTask.id} id.`);
    } else {
        console.log(`${ids} doesn't exists at all.`)
    }
}

//Function mark-done
function MarkDone(ids) {
    const tasks = readTasks();
    const doneTask = tasks.find(t => t.id === parseInt(ids));

    if(doneTask) {
        doneTask.status = "done";
        writeTasks(tasks);
        console.log(`Successfully marked the task to done for this ${doneTask.id} id.`);
    } else {
        console.log(`${ids} doesn't exists at all.`)
    }
}

//Function list all
function listall() {
    const tasks = readTasks();
    console.log(tasks);
}


//Function list by status
function listStatus(status) {
    const tasks = readTasks();

    let filteredTasks = tasks;

    if(status) {
        if(status.toLowerCase() === "done") {
            filteredTasks = tasks.filter((t) => t.status === "done");
        } else if (status.toLowerCase() === "todo"){
            filteredTasks = tasks.filter((t) => t.status === "todo");
        } else if (status.toLowerCase() === "in-progress") {
            filteredTasks = tasks.filter((t) => t.status === "in-progress");
        }
    }

    if(filteredTasks.length === 0 ) {
        console.log("No tasks found.");
    } else {
        console.log(filteredTasks);
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

    case "delete":
        const ids = arg[1];
        console.log("Delete command is active!!")
        deleteTask(ids);
        break;

    case "mark-in-progress": 
        const markId = arg[1];
        if(!markId) {
            console.log("Please provide a task ID. ");
            console.log("Sample: hello-nuru mark-in-progress 1");
        }
        MarkInProgress(markId);
        break;

    case "mark-done": 
        const doneId = arg[1];
            if(!doneId) {
            console.log("Please provide a task ID. ");
            console.log("Sample: hello-nuru mark-done 1");
        }
        MarkDone(doneId);
        break;

    case "list": 
        const [list, condition] = arg;
        
        if(!condition) {
            listall();
        } else {
            listStatus(condition);
        }
        break;

    default:
        console.log(`Sorry, we don't have that command !!`);
        break;
}