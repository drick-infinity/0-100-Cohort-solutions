// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const fs = require('fs');
fs.readFile("a.txt",'utf-8',(err,data)=>{
    console.log("Read from file");
    console.log(data);
    if(err){
        console.error("Not done");    }
})

const expensiveOperation = () =>{
    let sum =0;
    for(let i=0;i<1e8;i++){
        sum += i;
    }
    console.log("Expensive operation done ,Sum is:",sum);
}
expensiveOperation();