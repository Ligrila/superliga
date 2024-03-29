import moment from 'moment';
import 'moment/locale/es'
import "moment-timezone";


import * as Localization from 'expo-localization';


class DateTimeHelper{

    
    static async _deviceTz(){
        const t = await Localization.getLocalizationAsync();
        return t.timezone;
    }

    static async datetime(date){
        let m = moment.utc(date);
        m.locale('es');
        const tz = await DateTimeHelper._deviceTz();
        return m.tz(tz);
    }

    static async format(date){
        const ret = await DateTimeHelper.datetime(date);
        return ret.format('DD/MM/YYYY LT');
    }


}


export default DateTimeHelper;