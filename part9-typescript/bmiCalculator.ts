const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100))
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25 && bmi > 18.4) {
        return 'Normal'
    } else if (bmi > 24.9 && bmi < 30) {
        return 'Overweight'
    } else if (bmi > 29.9) {
        return 'Obese'
    } else {
        throw new Error('BMI out of range')
    }
}

try {
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message)
    }
}