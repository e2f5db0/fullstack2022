type Rating = 1 | 2 | 3;

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(t => t > 0).length;
    let sum = 0;
    for (const t of dailyExerciseHours) {
        sum += Number(t);
    }
    const average = periodLength > 0 ? sum / periodLength : 0;
    let rating;
    const diff = average - target;
    if (diff < -0.1) rating = 1;
    if (diff >= -0.1 && diff < 0) rating = 2;
    if (diff > 0) rating = 3;
    let ratingDescription: string;
    switch (rating) {
        case 1:
            ratingDescription = 'poor job';
            break;
        
        case 2:
            ratingDescription = 'not too bad but could be better';
            break;
        
        case 3:
            ratingDescription = 'great job';
            break;

        default:
            throw new Error('rating is invalid');
    }
    const success = average >= target;

    return {
        'periodLength': periodLength,
        'trainingDays': trainingDays,
        'success': success,
        'rating': rating,
        'ratingDescription': ratingDescription,
        'target': target,
        'average': average
    };
};

export { calculateExercises };
