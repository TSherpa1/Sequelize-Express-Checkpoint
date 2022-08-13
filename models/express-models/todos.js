let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    let peopleArray = [];
    for (let person in tasks) {
      if (!peopleArray.includes(person)) {
        peopleArray.push(person);
      }
    }
    return peopleArray;
  },

  add: function (name, task) {
    // saves a task for a given person
    if (tasks[name] === undefined) {
      tasks[name] = [];
      tasks[name].push(task);
      if (!task.complete) {
        task.complete = false;
      }
    } else {
      tasks[name].push(task);
      if (!task.complete) {
        task.complete = false;
      }
    }
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete
    if (tasks[name][idx].complete === undefined) {
      tasks[name][idx].complete = false;
    }
    if (tasks[name][idx].complete === false) {
      tasks[name][idx].complete = true;
    }
  },

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx, 1);
  },

  exists: function (name) {
    //checks if user exists
    for (let person in tasks) {
      if (person === name) {
        return true;
      }
    }
    return false;
  },
};
