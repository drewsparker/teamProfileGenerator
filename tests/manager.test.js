// using Manager constructor 
const Manager = require('../library/manager.js');

// creating manager employee  
test('creates an Manager employee', () => {
    const manager = new Manager('Sarah', 10, 'sarah.nicole@gmail.com', 6);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('get job title', () => {
    const manager = new Manager('Sarah', 10, 'sarah.nicole@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 