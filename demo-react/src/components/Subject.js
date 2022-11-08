import React from 'react';
import QuestionList from './QuestionList';
import SubjectHeader from './SubjectHeader';
import SubjectMetaData from './SubjectMetaData';

function Subject(props) {
  const { subject, ...other } = props;
  const { title, questions } = subject;

  const getAnsweredQuestion = () => {
    return questions.reduce((pre, cur) => {
      if (cur.selectedAnswer !== -1) pre++;

      return pre;
    }, 0);
  };

  const getMarkedQuestion = () => {
    return questions.reduce(function (pre, cur) {
      if (cur.isMarked) pre++;

      return pre;
    }, 0);
  };

  const getUnAnsweredQuestion = () => {
    return questions.length - getAnsweredQuestion();
  };

  const getMetaData = () => {
    return {
      answeredQuestion: getAnsweredQuestion(),
      markedQuestion: getMarkedQuestion(),
      unAnsweredQuestion: getUnAnsweredQuestion(),
    };
  };

  return (
    <section>
      <SubjectHeader title={title} />
      <SubjectMetaData metaData={getMetaData()} />
      <QuestionList questions={questions} {...other} />
    </section>
  );
}

export default Subject;
