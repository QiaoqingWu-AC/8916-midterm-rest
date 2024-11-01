const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// In-memory data store
const students = [
  { id: 1, name: "Alice", grade: "A", email: "alice@example.com" },
  { id: 2, name: "Bob", grade: "B", email: "bob@example.com" },
];
let currentId = 3; // Starting ID for new students

// Define the Welcome page
app.get('/', (req, res) => {
  console.log('[GET ROUTE]');
  res.json('HELLO FROM HOMEPAGE');
});

// GET /students: retrieve all students
app.get('/students', (req, res) => {
  res.send(students);
});

// GET /students/{id}: Retrieve details of a student by ID
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST /students: Add a new student
app.post('/students', (req, res) => {
  const { name, grade, email } = req.body;
  if (!name || !grade || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newStudent = { id: currentId++, name, grade, email };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/{id}: Update an existing student by ID
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { name, grade, email } = req.body;
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  if (name) student.name = name;
  if (grade) student.grade = grade;
  if (email) student.email = email;
  res.json(student);
});

// DELETE /students/{id}: Delete a student by ID
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students.splice(studentIndex, 1);
  res.status(204).send();
});

// Start the server and listen on port 8000
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
