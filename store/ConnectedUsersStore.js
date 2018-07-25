import Reflux from 'reflux';

export const ConnectedUsersActions = Reflux.createActions(['updateConnectedUsers']);

export class ConnectedUsersStore extends Reflux.Store
{
    usersCount = 0;
    constructor()
    {
        super();
        this.listenables = ConnectedUsersActions;
        this.state = this.getInititalState();

    }

    getInititalState(){
        return {usersCount:0};
    }

    async onUpdateConnectedUsers(c){
        console.log("update " + c);
        await this.setState({usersCount: c});
    }

}

