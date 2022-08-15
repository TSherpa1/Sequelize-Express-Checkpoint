const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async function () {
  await Task.destroy({
    where: {
      complete: true,
    },
  });
};

Task.completeAll = async function () {
  await Task.update(
    { complete: true },
    {
      where: {
        complete: false,
      },
    }
  );
};

Task.prototype.getTimeRemaining = function () {
  const date = new Date();
  if (this.due) {
    return this.due - date;
  }
  return Infinity;
};

Task.prototype.isOverdue = function () {
  if (this.getTimeRemaining() < 0 && this.complete === false) {
    return true;
  }
  return false;
};

Task.prototype.assignOwner = async function (owner) {
  return await this.setOwner(owner);
};

Owner.getOwnersAndTasks = async function () {
  return await Owner.findAll({ include: Task });
};

//you can use where clauses in magic methods the same way you do with model queries
Owner.prototype.getIncompleteTasks = async function () {
  //log out the methods of whatever you attach '__proto__' to
  //console.log(this.__proto__);

  return await this.getTasks({
    where: {
      complete: false,
    },
  });
};

Owner.beforeDestroy(function (owner) {
  if (owner.name === 'Grace Hopper') {
    throw new Error('Cannot delete instances named Grace Hopper');
  }
});

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
