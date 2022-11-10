import data from './data.json';

data.subjects.forEach((subject, subjectIndex) => {
  subject.questions.forEach((question, index) => {
    question.subjectId = subjectIndex;
    question.id = index;
    question.selectedAnswer = -1;
    question.isMarked = false;
  });
});

export default data;
