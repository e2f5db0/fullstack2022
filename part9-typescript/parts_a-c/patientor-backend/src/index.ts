import express from 'express';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/patients', patientRouter);
app.use('/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});