import DB from './db.js';
import UI from './ui.js';
import Timer from './timer.js';
import EventHandler from './eventHandler.js';

const db = new DB();
const timer = new Timer(db.getQuizDuration());
const ui = new UI(db, timer);
const eventHandler = new EventHandler(db, ui);

const enableEvents = function () {
    
    const optionsEL = document.getElementsByClassName("options")[0].getElementsByTagName("input");
    
    for (let i = 0; i < 4; i++)
        optionsEL[i].addEventListener("click", eventHandler.answerQuestion);
    
    document.querySelectorAll(".questionList").forEach(function (item) {
        
        item.addEventListener("click", eventHandler.refreshQuestion);
    });
    
    document.getElementById("clearBtn").addEventListener("click", eventHandler.clearQuestion);

    document.getElementById("markBtn").addEventListener("click", eventHandler.markQuestion);
    
    document.getElementById("previousBtn").addEventListener("click", eventHandler.previousQuestion);
    
    document.getElementById("nextBtn").addEventListener("click", eventHandler.nextQuestion);
    
    document.addEventListener("keydown", eventHandler.toggleQuestion);
    
    document.getElementById("endTestBtn").addEventListener("click", eventHandler.endTest);
}

const init = function () {
    
    timer.start();
    
    for (let i = 0; i < db.getNumberOfSubject(); i++)
        ui.addSubject (db.getSubject(i));
    
    ui.updateQuestion(db.getCurrentSubject(), db.getCurrentQuestion());
    
    enableEvents();
    
    return setInterval(ui.refreshTime, 1000);
}

window.timerId = init();
