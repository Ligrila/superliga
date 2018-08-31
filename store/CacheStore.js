/**
 * 
 *  Store con cache
 * 
*/

import Reflux from 'reflux';

import {AsyncStorage} from 'react-native';

export default class CacheStore extends Reflux.Store{
    cacheKey = null;
    constructor(cacheKey){
        super();
        this.cacheKey = cacheKey;
        this.setInititalStateCache(this.cacheKey,this.getInititalState())
    }

    getInititalState(){
        return {
            
        };
    }

    setInititalStateCache(key,data){
        this.state = data;
        try{
            AsyncStorage.getItem(key).then(
                (cacheData) => {
                    if(cacheData){
                        this.setState(JSON.parse(cacheData));
                    }
                }
            );
        } catch(e){}
    }

    setStateCache(data){
        this.setStateCacheWithKey(this.key,data);
    }

    setStateCacheWithKey(key,data){
        try{
            AsyncStorage.setItem(key,JSON.stringify(data))
            this.setState(data);
        } catch(e){}
    }

}