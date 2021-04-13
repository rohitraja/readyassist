

let getTenMostOccuredWords = function(filename, funCallback){
    return 0;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });


setImmediate(()=>{
    console.log("First");
});

process.nextTick(()=>{
    console.log("second");
});

console.log("third");