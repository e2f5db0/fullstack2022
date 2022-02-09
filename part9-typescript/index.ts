import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    try {
        const { height, weight } = _req.query
        if (!height || !weight) {
            res.send({
                error: 'malformatted parameters'
            })
        }
        const result = calculateBmi(Number(height), Number(weight))
        res.send({
            weight: weight,
            height: height,
            bmi: `bmi: ${result}`
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.send({error: error.message})
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});