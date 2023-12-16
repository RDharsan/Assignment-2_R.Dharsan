const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

//get all todo lists
const getTodos = async(req, res)=>{
    const todos = await Todo.find({}).sort({createdAt: -1})
    res.status(200).json(todos)
}

//get a single Todo
const getTodo = async(req, res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Tasks'})
    }

    const todo = await Todo.findById(id)
    if(!todo){
        return res.status(404).json({error:'No such Tasks'})
    }

    res.status(200).json(todo)
}

//create new todo
const createTodo = async(req, res) =>{
    const{taskTitle, description, priority, when} = req.body

    let emptyFields = []

    if(!taskTitle){
        emptyFields.push('taskTitle')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(!when){
        emptyFields.push('when')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const todo = await Todo.create({taskTitle, description, priority, when})
        res.status(200).json(todo)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

//delete todo
const deleteTodo = async(req, res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Task'})
    }
    
    const todo = await Todo.findOneAndDelete({_id: id})

    if(!todo){
        return res.status(404).json({error:'No Such Task'})
    }

    res.status(200).json(todo)

}

//update a todo
const updateTodo = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Task'})
    }

    const todo = await Todo.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!todo){ 
        return res.status(404).json({error:'No such Task'})
    }

    res.status(200).json(todo)
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
    
}
