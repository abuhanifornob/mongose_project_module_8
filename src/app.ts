import express, { Application } from 'express';

import cors from 'cors';

import bodyParser from 'body-parser';

import { StudentRouters } from './app/config/modules/student/student.route';
//const bodyParser = require("body-parser")
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parser
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// /api/v1/students/create-student
// applicaton routes
app.use('/api/v1/students', StudentRouters);

app.get('/', (req, res) => {
  res.send('App Is runnig');
});

export default app;
