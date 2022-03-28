const express = require('express');
const app = express();
app.use(express.json());

const userController = require('./controllers/user.controller');
const {register, login} = require('./controllers/auth.controller');
const todoController = require('./controllers/todo.controller');



app.use('/users', userController);
app.post('/register', register);
app.post('/login', login);
app.use('/todos', todoController);





module.exports = app;