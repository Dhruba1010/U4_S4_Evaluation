const express = require('express');

const router = express.Router();

const authenticate = require('../middlewares/authenticate');

const Todo = require('../models/todo.model');


router.post('', authenticate, async (req, res) => {
    req.body.userId = req.user._id;
    try{
        const todo = await Todo.create(req.body.userId);
        return res.status(201).send(todo);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});


router.get('', authenticate, async (req, res) => {
    try{
        const todo = await Todo.find().lean().exec();
        return res.status(200).send(todo);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

router.get('/:id', authenticate, async (req, res) => {
    try{
        const todo = await Todo.find().lean().exec();
        return res.status(200).send(todo);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

router.patch('/:id', authenticate, async (req, res) => {
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        return res.status(200).send(todo);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.body).lean().exec();
        return res.status(200).send(todo);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

module.exports = router;