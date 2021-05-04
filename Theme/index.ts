
import AppTheme from './AppTheme';
import colors from './variables/commonColor';
import getTheme from './components';
const nativeTheme = getTheme(colors);
export default {
    ...nativeTheme,
    ...AppTheme
};