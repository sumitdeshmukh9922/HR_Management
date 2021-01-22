const Employee = require("../models/employee.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const employee = new Employee({
        name: req.body.name,
        age: req.body.age,
        role: req.body.role,
        team: req.body.team,
        salary: req.body.salary
      });
    
      // Save Customer in the database
      Employee.create(employee, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Employee."
          });
        else res.send(data);
      });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${req.params.employeeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Employee with id " + req.params.employeeId
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Employee.updateById(
        req.params.employeeId,
        new Employee(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Employee with id ${req.params.employeeId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Employee with id " + req.params.employeeId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Employee.remove(req.params.employeeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${req.params.employeeId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Employee with id " + req.params.employeeId
            });
          }
        } else res.send({ message: `Employee was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all employee."
          });
        else res.send({ message: `All Employee were deleted successfully!` });
      });
};