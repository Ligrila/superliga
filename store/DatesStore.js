import {AsyncStorage} from 'react-native';
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';
import DateTimeHelper from '../helpers/DateTimeHelper';

export const DatesActions = Reflux.createActions(['calendar','reset']);



export class DatesStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Dates');
        this.listenables = DatesActions;
    }


    getInititalState(){
        return {
            Dates:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async calendar(){
        let response = await this.api.calendar();
        let data = [];
        if(response.success){
            for(var i=0;i<response.data.length;i++){
                let hasTrivia = false;
                for(var j=0;j<response.data[i].trivias.length;j++){
                    hasTrivia = true;
                    response.data[i].trivias[j].start_datetime_local = await DateTimeHelper.datetime(response.data[i].trivias[j].start_datetime);
                    response.data[i].trivias[j].start_datetime_local_string = await DateTimeHelper.format(response.data[i].trivias[j].start_datetime);
                }
                if(hasTrivia){
                    data.push(response.data[i]);
                }
            }
        }
        const state = {
            Dates:{
                hasData: true,
                data: data
            }
        }
        this.setStateCache(state)
    }
}

