const sql = require("./db.js");

// constructor
const Employee = function(employee) {
  this.name = employee.name;
  this.age = employee.age;
  this.role = employee.role;
  this.team = employee.team;
  this.salary = employee.salary;
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employee_info SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee is: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM employee_info WHERE id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM employee_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE employee_info SET name = ?, age = ? , role = ?, team = ?, salary = ? WHERE id = ?",
    [employee.name, employee.age, employee.role, employee.team, employee.salary, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee is: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employee_info WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM employee_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employee`);
    result(null, res);
  });
};

module.exports = Employee;