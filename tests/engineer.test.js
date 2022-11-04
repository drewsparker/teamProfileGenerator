// using Engineer constructor 
const Engineer = require('../library/engineer.js');

// creating engineer employee  
test('creates an Engineer employee', () => {
    const engineer = new Engineer('Sarah', 10, 'sarah.nicole@gmail.com', 'sarahnicole');
    
    expect(engineer.github).toEqual(expect.any(String));
});

// gets github from getGithub()
test('gets engineer github profile', () => {
    const engineer = new Engineer('Sarah', 10, 'sarah.nicole@gmail.com', 'sarahnicole');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

// gets job title from getRole() 
test('gets job title of employee', () => {
    const engineer = new Engineer('Sarah', 10, 'sarah.nicole@gmail.com', 'sarahnicole');

    expect(engineer.getRole()).toEqual("Engineer");
});