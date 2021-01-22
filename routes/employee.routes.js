module.exports = app => {
    const employess = require("../controllers/employee.controller.js");
  
    // Create a new Customer
    app.post("/employess", employess.create);
  
    // Retrieve all Customers
    app.get("/employess", employess.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/employess/:employeeId", employess.findOne);
  
    // Update a Customer with customerId
    app.put("/employess/:employeeId", employess.update);
  
    // Delete a Customer with customerId
    app.delete("/employess/:employeeId", employess.delete);
  
    // Create a new Customer
    app.delete("/employess", employess.deleteAll);
  };