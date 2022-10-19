import SubjectList from './SubjectList';
import TestDetails from './TestDetails';
import styles from './Sidebar.module.css';

function Sidebar(props) {
  return (
    <div className={styles.container}>
        <TestDetails />
        <SubjectList subjects={props.subjects}/>
    </div>
  );
}

export default Sidebar;
