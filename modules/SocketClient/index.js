/*
  Si hay problemas en IOS de user agent undefined cambiar
  vendor websockhop el archivo browserDetection.js al principio con
  esto:
    if(typeof(ua)=='undefined'){
        ua = 'react-native';
    }
*/
import WebSockHop from 'websockhop';

export default class SocketClient{
    _connectedEvents = [];
    constructor(){
        WebSockHop.logger = this.logger;
        var wsh = new WebSockHop('ws://192.168.0.138:8889/', {
          createSocket: function (url) {
            console.log(url);
            return new WebSocket(url);
          }
        });
  
        wsh.formatter = new WebSockHop.JsonFormatter();

        wsh.on('opened', function () {
          console.log('connected');
        });
  
        wsh.on('message', (message) => {
          //console.log(this._connectedEvents);
        });
  
        wsh.on('error', function (v,c) {
  
        });
  
        wsh.on('closed', function() {
          console.log('finished');
          wsh = null;
        });
    }

    connect(eventName,handler){
      this._connectedEvents[eventName].push(handler);
      console.log(this._connectedEvents);
    }


    logger(type, message){
        if(__DEV__)
            console.log("Socket: " + type + "-" + message);
    }
}