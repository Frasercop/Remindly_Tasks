let database = require("../database");
const { getUserById } = require("./userController");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.getUserById(req).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.getUserById(req).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.getUserById(req).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.getUserById(req).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id;
    let searchResult = database.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let reminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToFind = req.params.id;
    let user = getUserById(req);
    let searchResult = database.user.reminders.find(function (reminder) {return reminder.id == reminderToFind});
    database.user.reminders.splice(searchResult, 1);
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
