import { Lesson } from './getGoalByUser';

export default function getGoalColor(lessonType: Lesson, points: number) {
  let color;

  if (lessonType !== 'AVALIAÇÃO') {
    color = points >= 50 ? '#090' : '#c00';
  } else {
    color = points >= 80 ? '#090' : '#c00';
  }

  return `[color="${color}"]`;
}
