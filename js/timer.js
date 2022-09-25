export default function CreateTimer (duration) {
    
    let start;
    let interval;
    let remainingTime;
    const limit = duration;
    
    const time = {
        
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    
    this.start = function () {
        
        start = new Date().getTime();
    };
    
    this.getRemainingTime = function () {
        
        updateTime();
        return time;
    };
    
    const updateTime = function () {
        
        interval = Math.floor(((new Date().getTime() - start) % (3600 * 24)) / 1000);
        
        remainingTime = limit - interval;
        
        let temp = remainingTime;
        
        time.hours = Math.floor(temp / 3600);
        temp %= 3600;
        time.minutes = Math.floor(temp / 60);
        temp %= 60;
        time.seconds = temp;
    };
}