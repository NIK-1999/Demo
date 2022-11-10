export function computeScore(subjects) {
  const score = [];

  subjects.forEach((subject, index) => {
    score[index] = {};
    score[index].title = subject.title;
    score[index].totalQuestions = subject.questions.length;

    score[index].correctQuestions = subject.questions.reduce(function (pre, cur) {
      if (cur.selectedAnswer === cur.correctAnswer) pre++;

      return pre;
    }, 0);
  });
  return score;
}
