
# CS349 Assignment 4

**Developer:** Soham Nagi

**Student ID:** 20948927

**Course:** CS349 Fall 2024 - User Interfaces

**Assignment:** A4 Preact Quiz App

**Date:** November 29, 2024

## Overview

This project is a reimplementation of the quiz app, developed as a quiz management application that employs Preact. The project allows users to add, delete, select, and deselect quiz questions while supporting undo/redo operations for adding and deleting questions.

## Functionality

1. **List Mode**:
   - Displays a list of questions as selectable rectangles, each with a checkbox.
   - Supports "All," "None," "Delete," and "Add" buttons.
   - Allows toggling between "list" and "quiz" modes.

2. **Quiz Mode**:
   - Randomly displays a selected question with answer options as buttons.
   - Tracks answers and displays results at the end of the quiz.
   - "Cheating" mode can be toggled using the `?` key.

3. **Undo/Redo**:
   - Supports undo and redo operations for add and delete actions.
   - Operates at a grouped level (e.g., all questions deleted in one action can be restored as a group).

4. **Edit Mode**
   - Allows editing of question text and answers.
   - Includes Save and Cancel options to apply or discard changes.
   - Supports undo and redo operations for edited questions.

## Installation & Execution

Ensure you have **Node.js** and **npm** installed. Run the following commands in the project directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome to interact with the app.

## Acknowledgements

This README was generated with ChatGPT by feeding it the assignment instructions and my code.
The ToDo demo was used as reference to implement the HTML MVC and the undo/redo functionality.
