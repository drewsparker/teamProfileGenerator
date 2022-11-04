// using Intern constructor 
const Intern = require('../library/intern.js');

// creating intern employee  
test('creates an Intern object', () => {
    const intern = new Intern('Sarah', 10, 'sarah.nicole@gmail.com', 'UT');
    
    expect(intern.school) .toEqual(expect.any(String));
});

// gets school from getSchool()
test('gets intern school', () => {
    const intern = new Intern('Sarah', 10, 'sarah.nicole@gmail.com', 'UT');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// gets job title from getRole()
test('gets job title of employee', () => {
    const intern = new Intern('Sarah', 10, 'sarah.nicole@gmail.com', 'UT');

    expect(intern.getRole()).toEqual("Intern");
}); 