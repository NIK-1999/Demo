const timer = {

    start: function (duration) {
        
        this.startTime = new Date().getTime();
        this.duration = duration;
    },
    
    updateTime: function () {
        
        const interval = Math.floor(((new Date().getTime() - this.startTime) % (3600 * 24)) / 1000);
        
        let remainingTime = this.duration - interval;
        
        const time = {};
        
        time.hours = Math.floor(remainingTime / 3600);
        remainingTime %= 3600;
        time.minutes = Math.floor(remainingTime / 60);
        remainingTime %= 60;
        time.seconds = remainingTime;
        
        return time;
    }
}

export default timer;