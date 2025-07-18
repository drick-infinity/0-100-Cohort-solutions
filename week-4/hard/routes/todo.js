const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo } = require("../database");
const router = Router();

// todo Routes
router.post('/',async (req, res) => {
    // Implement todo creation logic
    try{
        const {title,description,userId} = req.body;
        const todo = await Todo.create({
            title,
            description,
            user:userId
        });
        res.status(201).json(todo);
    }catch(err){
        res.status(500).json({
            error:'Failed to create todo',
            details:err.message
        });
    }
});

router.put('/', adminMiddleware, async(req, res) => {
    // Implement update todo  logic
    const{id,title,description,status} = req.body;

    if(!id){
        return res.status(400).json({
            error:"Todo Id is required in body"
        })
    }
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {title,description,status},
        {new :true}
        );
        if(!updatedTodo){
            return res.status(404).json({
                error:'Todo not found'
            })
        }
        res.json(updatedTodo);
    }catch(err){
        res.status(500).json({
            error:"Failed to update todo"
        })
    }
});

router.delete('/', adminMiddleware, async(req, res) => {
    // Implement delete todo logic
    try{
        await Todo.deleteMany({});
        res.json({
            message:'All todos deleted successfully'
        })
    }catch(err){
        res.status(500).json({
            error:'Failed to delete todos'
        })
    }
});

router.delete('/:id', adminMiddleware, async(req, res) => {
    // Implement delete todo by id logic
    try{
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTodo) return res.status(404).json({
            error:"Todo not found"
        });
        res.json({message:"Todo deleted successfully"});
    }catch(err){
        res.status(500).json({
            error:"Failed to delete todo"
        })
    }
});


router.get('/', adminMiddleware, async(req, res) => {
    // Implement fetching all todo logic
    try{
        const todos = await Todo.find().populate('user','email');
        res.json(todos);
    }catch(err){
        res.status(500).json({
            error:'Failed to fetch todos'
        });
    }
});

router.get('/:id', adminMiddleware,async (req, res) => {
    // Implement fetching todo by id logic
    try{
        const todo = await Todo.findById(req.params.id).populate('user','email');
        if(!todo) return res.status(404).json({
            error:'Todo not found'
        });
        res.json(todo);
    }catch(err){
        res.status(500).json({
            error:"Failed to fetch todo"
        })
    }
});

module.exports = router;