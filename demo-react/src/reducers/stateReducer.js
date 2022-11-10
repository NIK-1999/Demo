import produce from 'immer';

const stateReducer = produce((draft, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      draft.subjects[draft.subjectId].questions[draft.questionId].selectedAnswer = action.payload;
      break;
    case 'CHANGE_QUESTION':
      draft.subjectId = action.payload.subjectId;
      draft.questionId = action.payload.questionId;
      break;
    case 'CLEAR_QUESTION':
      draft.subjects[draft.subjectId].questions[draft.questionId].selectedAnswer = -1;
      break;
    case 'TOGGLE_QUESTION_MARKING':
      const isMarked = draft.subjects[draft.subjectId].questions[draft.questionId].isMarked;
      draft.subjects[draft.subjectId].questions[draft.questionId].isMarked = !isMarked;
      break;
    default:
      break;
  }
});

export default stateReducer;
