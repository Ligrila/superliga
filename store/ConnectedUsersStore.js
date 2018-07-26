import Reflux from 'reflux';

export const ConnectedUsersActions = Reflux.createActions(['updateConnectedUsers']);

export class ConnectedUsersStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = ConnectedUsersActions;
        this.state = this.getInititalState();

    }

    _nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }

    getInititalState(){
        return {usersCount:0};
    }

    async onUpdateConnectedUsers(c){
        console.log("update " + c);
        await this.setState({usersCount: this._nFormatter(c)});
    }

}

