#!/usr/bin/env node
// const readline = require("node:readline");
// const { stdin: input, stdout: output} = require("node:process");

// const rl = readline.createInterface({ input, output});

// rl.question('What is your name? ', (ans) => {
//     console.log(`Hello ${ans}`);
//     rl.close();
// });

const [,, ... args] = process.argv;
console.log(process.argv);
console.log(`Hello World ${args}`);
