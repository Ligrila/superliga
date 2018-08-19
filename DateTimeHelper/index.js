import moment from 'moment';
import "moment-timezone";


import { DangerZone } from 'expo';
const { Localization } = DangerZone;


class DateTimeHelper{

    
    static async _deviceTz(){
        return await Localization.getCurrentTimeZoneAsync();
    }

    static async datetime(date){
        let m = moment.utc(date);
        const tz = await DateTimeHelper._deviceTz();
        return m.tz(tz);
    }

    static async format(date){
        const ret = await DateTimeHelper.datetime(date);
        return ret.format('DD/MM/YYYY LT');
    }


}


export default DateTimeHelper;