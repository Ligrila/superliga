
import Api from "../../api/Api";
import AuthHelper from "../../helpers/Auth/Auth.helper";


export default class UserUtility {

    static authHelper = new AuthHelper();
    static api = new Api();

    static async getUpdateUserInformation() {
        const response = await this.api.getUserInformation();
        const userInfoResp = this.authHelper.formatAuthUser(response);
        return userInfoResp;
    }

}