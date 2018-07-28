
import ActionDispatcher from '../../store/ActionDispatcher';




export default class SocketClient{
    number= 0;
    autoReconnectInterval=5*1000;
    actionDispatcher = new ActionDispatcher;

    constructor(){
        try{
          this.open('ws://192.168.0.138:8889/');
        } catch(e){
          console.log(e);
        }
    }

    open(url){
      this.url = url;
      this.instance = new WebSocket(this.url);
      this.instance.onopen = ()=>{
        this.onopen();
      };
      this.instance.onmessage = (data)=>{
        this.number ++;
        this.onmessage(data,this.number);
      };
      this.instance.onclose= (e)=>{
        switch (e.code){
        case 1000:	// CLOSE_NORMAL
          console.log("WebSocket: closed");
          break;
        default:	// Abnormal closure
          this.reconnect(e);
          break;
        }
        this.onclose(e);
      };
      this.instance.onerror = (e)=>{
        switch (e.code){
        case 'ECONNREFUSED':
          this.reconnect(e);
          break;
        default:
          this.onerror(e);
          break;
        }
      };
    }
    send(data,option){
      try{
        this.instance.send(data,option);
      }catch (e){
        console.log("error send");
      }
    }
    reconnect (e){
      console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`,e);
      this.instance = null;
      var that = this;
      
      setTimeout(function(){
        console.log("WebSocketClient: reconnecting...");
        that.open(that.url);
      },this.autoReconnectInterval);
    }


    onopen(){	console.log("WebSocketClient: open");	}
    onmessage(message,number){	
      try{
      const data = JSON.parse(message.data);
      this.actionDispatcher.dispatch(data);
      } catch(e){
        console.log("WebSocketClient: error parsing json",e);
      }
    }
    onerror(e){	console.log("WebSocketClient: error");	}
    onclose(e){	console.log("WebSocketClient: closed");	}


}