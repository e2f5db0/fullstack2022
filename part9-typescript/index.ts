import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    try {
        const { height, weight } = _req.query;
        if (!height || !weight) {
            res.send({
                error: 'malformatted parameters'
            });
        }
        const result = calculateBmi(Number(height), Number(weight));
        res.send({
            weight: weight,
            height: height,
            bmi: `bmi: ${result}`
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.send({ error: error.message });
        }
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.send({
            error: "parameters missing"
        });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(daily_exercises, Number(target));
        res.send(result);
    } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
        res.send({
            error: "malformatted parameters"
        });
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});