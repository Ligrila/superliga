import Reflux from 'reflux';
import Api from '../api/Api';

export const UsersActions = Reflux.createActions(['me','update']);

export class UsersStore extends Reflux.Store
{
    api = new Api;
    constructor()
    {
        super();
        this.listenables = UsersActions;
        this.state = this.getInititalState();

    }


    getInititalState(){
        return {user:null,hasInformation:false};
    }

    async onMe(user){
        await this.setState({user: user,hasInformation:true});
    }

    async onUpdate(){
        var response = await this.api.getUserInformation();
        if(response.success)
            UsersActions.me(response.data.user);
    }

}

