import Reflux from 'reflux';
import {AppState} from 'react-native'

export const ConnectionStatusActions = Reflux.createActions(['set','reset']);


export class ConnectionStatusStore extends Reflux.Store
{
    timer = null;
    constructor()
    {
        super();
        this.listenables = ConnectionStatusActions;
        this.state = this.getInititalState();
        AppState.addEventListener('change', this._handleAppStateChange);

    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.ConnectionStatus.appState.match(/inactive|background/) && nextAppState === 'active') {
          //console.log('App has come to the foreground!')
        }
        this.setState({
            ConnectionStatus:{
                connected: this.state.ConnectionStatus.connected,
                appState: nextAppState
            }
        });
      }
    
    getInititalState(){
        return {
            ConnectionStatus: {
                connected: false,
                appState: AppState.currentState
            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }

    set(connected){
        this.setState({
            ConnectionStatus:{
                appState: this.state.ConnectionStatus.appState,
                connected: connected
            }
        });
    }

}

