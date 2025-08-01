# Input
The user types a task into an input field and clicks the “Add Task” button. Each task is stored as a string in a state array.

# Process
The app uses `useState` to manage the task list and the input field. When the “Add Task” button is clicked, the input is added to the array. The `.map()` method renders all tasks. Clicking “Delete” removes the task from the list using `filter`.

# Output
Tasks are displayed as a styled list with a delete button. When “Delete” is clicked, the UI updates to reflect the change without a page reload.