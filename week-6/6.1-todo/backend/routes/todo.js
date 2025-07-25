let todos = []; // in memory space
let currentId = 1;

export async function getAllTodo (req, res, next){
    //  write here
    res.json(todos);
}

export async function createTodo (req, res, next){
    //  write here
    const {task} = req.body;
    if(!task){
        return res.status(400).json({
            error:"Task is required"
        })
    }
    const newTodo = {id:currentId++,task};
    todos.push(newTodo);
    res.status(201).json(newTodo);
}

export async function updateTodo (req, res, next){
    //  write here
    const id = Number(req.params.id);
    const {task} = req.body;

    if(!task){
        return res.status(400).json({
            error:"Task is required"
        });
    }
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if(todoIndex !== -1){
        todos[todoIndex]={ ...todos[todoIndex],task};
        res.json(todos[todoIndex]);
    }else{
        res.status(404).json({
            message:"Todo not found"
        })
    }
}

export async function deleteTodo (req, res, next){
    //  write here

    todos = [];
    currentId = 1;
    res.json({
        message:"All todos deleted"
    })
   
}

export async function deleteTodoById (req, res, next){
    //  write here
    const id = Number(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id == id);

    if(todoIndex !== -1){
        todos.splice(todoIndex,1);
        res.status(204).send();
    }else{
        res.status(404).json({
            message:"Todo not found"
        });
    }
}
export async function searchTodo(req,res,next){
    //write here
    const {q} = req.query;
    if(!q){
        return res.status(400).json({
            message:'Query paramaeter'
        })
    }

    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(q.toLowerCase())
    
    );
    res.json(filteredTodos);
}