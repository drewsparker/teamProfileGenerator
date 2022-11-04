// using Employee constructor 
const Employee = require('../library/employee.js');

// creates a new employee  
test('creates new employee object', () => {
    const employee = new Employee('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

// gets name from getName() 
test('gets name', () => {
    const employee = new Employee('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(employee.getName()).toEqual(expect.stringContaining(employee.name.toString()));
});

// gets id from getId() 
test('gets ID', () => {
    const employee = new Employee('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(employee.getId()).toEqual(expect.any(Number));
});

// gets email from getEmail()
test('gets email', () => {
    const employee = new Employee('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

// gets role from getRole()
test('gets role', () => {
    const employee = new Employee('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(employee.getRole()).toEqual("Employee");
}); 