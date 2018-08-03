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




export default class SocketClient{
    _connectedEvents = [];
    constructor(){
        //WebSockHop.logger = this.logger;
        try{
            WebSockHop.log = () => {};
            this.actionDispatcher = new ActionDispatcher;
            var wsh = new WebSockHop(Enviroment.socketUrl, {
              createSocket: function (url) {
                return new WebSocket(url);
              }
            });
      
            wsh.formatter = new WebSockHop.JsonFormatter();

            wsh.on('opened', function () {
              console.log('connected');
            });
            wsh.on('message', (message) => {
              if(typeof(message.eventName)=='string'){
                this.actionDispatcher.dispatch(message);
              }
            });
      
            wsh.on('error', function (v,c) {
      
            });
      
            wsh.on('closed', function() {
              console.log('finished');
              wsh = null;
            });
        } catch(e){
          console.log(e);
        }
    }


    logger(type, message){
        if(__DEV__)
            console.log("Socket: " + type + "-" + message);
    }
}