import React from "react";
import styles from "./Content.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Question from "./Question";

function Content () {

    return (
        <div className={styles.container}>
            <Header />
            <Question />
            <Footer />
        </div>
    );
}

export default Content;