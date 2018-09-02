import Reflux from 'reflux';

export const ConnectionStatusActions = Reflux.createActions(['set','reset']);


export class ConnectionStatusStore extends Reflux.Store
{
    timer = null;
    constructor()
    {
        super();
        this.listenables = ConnectionStatusActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            ConnectionStatus: {
                connected: false
            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }

    set(connected){
        this.setState({
            ConnectionStatus:{
                connected: connected
            }
        });
    }

}

