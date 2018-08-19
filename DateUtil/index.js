class DateUtil{
    serverTimeZoneOffset = 3; // argentina
    constructor(){
        var date = new Date();
        this.timeZoneOffset = date.getTimezoneOffset() / 60; // -3 +3 etc
    }
}


export default DateUtil;