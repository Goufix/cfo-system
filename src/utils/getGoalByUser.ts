import getGoalColor from './getGoalColor';

export interface UserData {
  Nick: string;
  points: number;
  lessons: number;
  activities: number;
}

export type Lesson = 'ADMINISTRAÇÃO' | 'AVALIAÇÃO' | '';

export function getGoalByUser(userData: UserData[], title: string) {
  const response = userData
    .map(({ Nick, points, lessons, activities }, index) => {
      const lessonsCount = points / 10;

      const lessonType: Lesson = lessons
        ? 'ADMINISTRAÇÃO'
        : title !== 'AVALIAÇÕES'
        ? ''
        : 'AVALIAÇÃO';

      const color = getGoalColor(lessonType, points);
      const customMessage = index === 0 ? '[Melhor do ciclo]' : '';

      let result = `${color}[b]${Nick}[/b] `;

      if (lessons) {
        result += `{${lessons} Aul/${activities} Atv} - ${points}% ${customMessage}`;
      } else if (title !== 'AVALIAÇÕES') {
        result += `{${lessonsCount} Aul} - ${points}% ${customMessage}`;
      } else {
        result += ` {${lessonsCount} Avl} - ${points}% ${customMessage}`;
      }
      return (result += '[/color]');
    })
    .join('\n');

  return response;
}
