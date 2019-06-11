import Reflux from 'reflux';





export const ChatActions = Reflux.createActions(
    [
        'setMessages',
        'sendMessage',
        'setSocket',
        'appendMessage',
        'reset'
    ]
);




export class ChatStore extends Reflux.Store
{
    

    constructor()
    {
        super();
        this.listenables = ChatActions;
        this.state = this.getInititalState();

    }

    getInititalState(){
        this.socket = null
        return {
            Chat: {
                hasData: false,
                data: [],
            },
        };
    }
    reset(){
        console.log("ChatActions::reset")
        this.state = this.getInititalState()
    }
    setSocket(socket){
        this.socket = socket
    }
    sendMessage(message){
        if(this.socket){
            this.socket.emit('broadcast',message)
        } else{
            console.warn("no socket set")
        }
    }

    appendMessage(message){
        let messages = this.state.Chat.data
        messages.push(message)
        this.setState({
            Chat: {
                hasData: true,
                data: messages,
            },
        });
    }
 

    setMessages(messages){
        this.setState({
            Chat: {
                hasData: true,
                data: messages,
            },
        });
    }


}

