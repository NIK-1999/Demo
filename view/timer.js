const Timer = function () {
    
    let controller;
    
    this.init = function (controller_) {
      
        controller = controller_;
        this.timerElement = document.getElementById("timer");
        window.timerID = setInterval(this.render.bind(this), 1000);
    };
    
    this.render = function () {
        
        const time = controller.getRemainingTime();
        
        if(time.seconds < 0) {
            
            controller.endTest();
            return;
        }
        
        const h = (time.hours < 10) ? ('0' + time.hours) : (time.hours);
        const m = (time.minutes < 10) ? ('0' + time.minutes) : (time.minutes);
        const s = (time.seconds < 10) ? ('0' + time.seconds) : (time.seconds);
        
        let res = h + " : " + m + " : " + s;
        
        this.timerElement.innerHTML = res;
    };
};

export default (new Timer());