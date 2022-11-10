import PropTypes from 'prop-types';
import SubjectList from './subject_list/SubjectList';
import styles from './Sidebar.module.css';

function Sidebar(props) {
  return (
    <div className={styles.container}>
      <div className={styles.testDetails}>
        <h4>Mock test-1</h4>
        <button className={styles.endTestButton} onClick={props.endTest}>
          End Test
        </button>
      </div>
      <SubjectList
        subjects={props.subjects}
        curQuestion={props.curQuestion}
        changeQuestion={props.changeQuestion}
      />
    </div>
  );
}

Sidebar.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answers: PropTypes.arrayOf(PropTypes.string).isRequired,
          correctAnswer: PropTypes.number.isRequired,
        })
      ),
    })
  ),
  curQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
  }),
  changeQuestion: PropTypes.func,
  endTest: PropTypes.func,
};

Sidebar.defaultProps = {
  subjects: [],
  curQuestion: {},
  changeQuestion: () => {},
  endTest: () => {},
};

export default Sidebar;
