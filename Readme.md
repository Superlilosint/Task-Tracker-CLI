# Task Tracker CLI

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

## Features

- Add new tasks with a unique ID (incremental) and store it in `JSON` format.
- Update the description of an existing task also added the updatedAt time.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Prerequisties
- Node.js installed on your system.

## Installation
**Clone the Repository**
```bash
git clone https://github.com/Superlilosint/Task-Tracker-CLI.git

# Navigate to the project Directory
cd Task-Tracker-CLI
```

## Configure
```bash 
    #package.json
      "bin": { "hello-cli": "./index.js" }
    
    # where "hello-cli" is command to run the index.js. 
    
    #run
    npm link 
```
## Usage 
- **Add a Task**
```bash
    hello-cli add "Drink a Coffee"
```

- **Update a Task**
```bash
    hello-cli update 1 "Drink a Milk"
```


### Sample JSON structure
```JSON 
[
    {
        "id": 1,
        "description": "Drink a Coffee",
        "status": "todo",
        "createdAt":1772892504506,
    }
]
```
