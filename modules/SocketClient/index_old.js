/*
  Si hay problemas en IOS de user agent undefined cambiar
  vendor websockhop el archivo browserDetection.js al principio con
  esto:
    if(typeof(ua)=='undefined'){
        ua = 'react-native';
    }
*/
import WebSockHop from 'websockhop/src/';



import ActionDispatcher from '../../store/ActionDispatcher';
import Enviroment from '../../constants/Enviroment';


import {Toast} from 'native-base'
import { ConnectionStatusActions } from '../../store/ConnectionStatusStore';

export default class SocketClient{
    connected = false;
    constructor(){
        //WebSockHop.logger = this.logger;
        try{
            //WebSockHop.log = () => {};
            this.actionDispatcher = new ActionDispatcher;
            this.socket = new WebSockHop(Enviroment.socketUrl, {
              createSocket: function (url) {
                console.log(url)
                return new WebSocket(url);
              }
            });
      
            this.socket.formatter = new WebSockHop.JsonFormatter();

            this.socket.on('opened', function () {
              //ConnectionStatusActions.set(true);
              //console.log('Init Websocket connection');
              this.connected = true;
            });
            this.socket.on('message', (message) => {
              //console.log({message});
              if(typeof(message.eventName)=='string'){
                this.actionDispatcher.dispatch(message);
              }
            });
      
            this.socket.on('error', function (v,c) {
              console.log("error",v)
              this.connected = false;
            });
      
            this.socket.on('closed', function() {
              //console.log('closed Websocket');
              this.socket = null;
              this.connected = false;
            });
        } catch(e){
          console.log(e);
        }

    }

    close(){
      this.socket.close();
    }

    logger(type, message){
        if(__DEV__)
            console.log("Socket: " + type + "-" + message);
    }
}