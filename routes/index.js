const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');

module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', async (req, res, next) => {
  try {
    let people = await todos.listPeople();
    res.status(200).send(people);
  } catch (error) {
    next(error);
  }
});

router.get('/:name/tasks', async (req, res, next) => {
  try {
    if (await todos.exists(req.params.name)) {
      let tasks = await todos.list(req.params.name);
      if (req.query.status) {
        if (req.query.status === 'complete') {
          let queryFilteredTask = tasks.filter((task) => {
            //console.log(task.complete);
            return task.complete === true;
          });
          //console.log(queryFilteredTask);
          res.status(200).send(queryFilteredTask);
        } else {
          let queryFilteredTask = tasks.filter((task) => {
            return task.complete === false;
          });
          res.status(200).send(queryFilteredTask);
        }
      } else {
        res.status(200).send(tasks);
      }
    } else {
      res.status(404).send('<h1>Name not found</h1>');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:name/tasks', async (req, res, next) => {
  try {
    if (!req.body.content) {
      res.status(400).send('<h1>Bad request</h1>');
    } else {
      await todos.add(req.params.name, req.body);
      res.status(201).send(req.body);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:name/tasks/:index', async (req, res, next) => {
  try {
    await todos.complete(req.params.name, req.params.index);
    res.status(200).send(`<h1>Added task!</h1>`);
  } catch (error) {
    //next(error);
    console.error(error);
  }
});

router.delete('/:name/tasks/:index', async (req, res, next) => {
  try {
    await todos.remove(req.params.name, req.params.index);
    res.status(204).send('<h1>Task deleted!</h1>');
  } catch (error) {
    next(error);
  }
});
