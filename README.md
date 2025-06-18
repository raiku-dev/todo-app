# Practice Task:

## Create a TypeScript application to organize todos.

### Assumptions:

Use TypeScript types and classes to structure the project.
Write at least one unit test to test the login functionality (we prefer Jest).
Do not include any external libraries.

Focus on clean and structured code. Consider which classes are necessary. Keep layouts basic. Implementation based on modern technics are more important, than styling.

Once you’ve completed the sample exercise, we would be happy to receive a GitHub link (or a link to another Git host of your choice) with your solution. You may also send the solution via email as a ZIP file.

### Requirements

#### Login Page

- [x] Create a login page
- [x] Save the login information in the browser’s local storage
- [x] Username/password validation can be hardcoded in the source
- [x] If the user is already logged in, redirect to the detail page

#### Detail Page

- [x] Create a detail page
- [x] This page should only be accessible if the user is logged in. Otherwise, redirect to the login page
- [ ] Create a form that includes the following fields
    - [ ] Title (max. 100 characters)
    - [ ] Text (max. 300 characters)
    - [ ] Display the number of used characters below the text field: x/300
    - [ ] Date field
    - [ ] Save button
    - [ ] When clicking the Save button, the form data should appear in a list below the form.
    - [ ] Ensure form validation: all fields must be filled
    - [ ] After saving, the form should be cleared
- [ ] Below the form, display a list of the entries created (title + date)
- [ ] When a new entry is created, it should be added to this list
- [ ] The list must not be persisted. This means that reloading the page may result in an empty list
- [ ] Add an Edit button (or link) behind each entry. This should load the entry back into the form at the top of the page
- [ ] Once the form is saved, it should update the entry in the list and then be cleared again

#### Add test

_NOTE: I will be using Vitest because Jest is not compatible with Vite OOTB. From my understanding it should be a drop-in replacement._

- [ ] Test login functionality
