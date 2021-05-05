
import Layout from '../../constants/Layout';




export default class ThemeUtility {

    static s(size) {
        return size * Layout.window.ratio;
    }
    static h(size) {
        return size * Layout.window.heightRatio;
    }
}
