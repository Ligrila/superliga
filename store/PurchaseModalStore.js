import Reflux from 'reflux';
import Api from '../api/Api';

export const PurchaseModalActions = Reflux.createActions(['setVisible','reset']);

export class PurchaseModalStore extends Reflux.Store
{
    
    constructor()
    {
        super();
        this.listenables = PurchaseModalActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            PurchaseModal:{
                visible: false
            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }

    /***
     * @param question_id question id
     * @param option integer, the number of option
    */
    setVisible(b){
        this.setState({
            PurchaseModal:{
                visibile: b
            }
        });
    }
}

