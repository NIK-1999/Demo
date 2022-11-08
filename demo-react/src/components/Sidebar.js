import SubjectList from './SubjectList';
import TestDetails from './TestDetails';
import styles from './Sidebar.module.css';

function Sidebar(props) {
  const { endTest, ...other } = props;

  return (
    <div className={styles.container}>
      <TestDetails endTest={endTest} />
      <SubjectList {...other} />
    </div>
  );
}

export default Sidebar;
