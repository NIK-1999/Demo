import React from "react";
import Subject from "./Subject";
import styles from "./SubjectList.module.css";

function SubjectList (props) {

    return (
        <div className={styles.container}>
            {
                props.subjects.map((subject, index) => {
                    return <Subject key={subject.title + index} subject={subject}/>
                })
            }
        </div>
    );
}

export default SubjectList;