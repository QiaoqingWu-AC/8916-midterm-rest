const express = require("express");
const bodyParser = require("body-parser");

// Initialize the express application and port number
const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// In-memory database of users
const students = [
  { id: 1, studentName: "Alice", age: 20 },
  { id: 2, studentName: "Bob", age: 21 },
];

// GET /students: retrieve all the students data
app.get('/students', (req, res) => {
  res.send(students);
});

// GET /students/{id}: Retrieve details of a student by ID.
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST /students: Add a new student.
app.post('/students', (req, res) => {
  const { studentName, age } = req.body;
  const student = students.find((s) => s.id === studentId);
  if (!studentName || age === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newStudent = { id: currentId++, studentName, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/{id}: Update an existing student by ID.


// DELETE /students/{id}: Delete a student by ID.



app.get('/', (req, res) => {
  console.log('[GET ROUTE]');
  res.json('HELLO FROM HOMEPAGE');
})

// start the server and listen on port 8000
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));