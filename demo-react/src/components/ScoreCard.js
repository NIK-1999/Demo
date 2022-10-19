import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ScoreCard.module.css';

function ScoreCard(props) {
  let overallCorrectQuestions = 0;
  let overallQuections = 0;
  const score = props.getScore();
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div>
        <h2>Score Card</h2>
        {score.map((item, index) => {
          overallCorrectQuestions += item.correctQuestions;
          overallQuections += item.totalQuestions;

          return (
            <section key={index}>
              <p>{item.title}</p>
              <span>{`${item.correctQuestions}/${item.totalQuestions}`}</span>
            </section>
          );
        })}
        <hr />
        <section>
          <p>Total</p>
          <span>{`${overallCorrectQuestions}/${overallQuections}`}</span>
        </section>
      </div>
    </div>,
    document.getElementById('result')
  );
}

export default ScoreCard;

const createScoreCard = function (score) {
  const parentDiv = document.createElement('div');
  const childDiv = document.createElement('div');
  const h2 = document.createElement('h2');
  const hr = document.createElement('hr');

  let overallCorrectQuestions = 0;
  let overallQuections = 0;

  h2.innerHTML = 'Score Card';

  childDiv.appendChild(h2);

  score.forEach(function (item, i) {
    const section = document.createElement('section');
    const p = document.createElement('p');
    const span = document.createElement('span');

    p.innerHTML = item.title;
    span.innerHTML = `${score[i].correctQuestions}/${score[i].totalQuestions}`;

    overallCorrectQuestions += score[i].correctQuestions;
    overallQuections += score[i].totalQuestions;

    section.appendChild(p);
    section.appendChild(span);

    childDiv.appendChild(section);
  });

  childDiv.appendChild(hr);

  const section = document.createElement('section');
  const p = document.createElement('p');
  const span = document.createElement('span');

  p.innerHTML = 'Total';
  span.innerHTML = `${overallCorrectQuestions}/${overallQuections}`;

  section.appendChild(p);
  section.appendChild(span);

  childDiv.appendChild(section);

  parentDiv.appendChild(childDiv);
  parentDiv.className = 'result';

  return parentDiv;
};
