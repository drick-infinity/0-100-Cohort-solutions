// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

const dataToWrite = "Hello written by user";

fs.writeFile("a.txt",dataToWrite,(err,data)=>{
    console.log("The data is Written in a.txt file");
    
})