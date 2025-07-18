const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb-url');

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
  name:{type:String,required:true},
  email:{type:String,unique:true,required:true},
  password:{type:String,required:true}
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['todo','in-progress','done'],
        default:'todo'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}