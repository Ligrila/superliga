import { StyleSheet }  from 'react-native';
import ThemeUtility  from '../../utilities/Theme/Theme.utility'
import Layout  from '../../constants/Layout'
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    logoContainer:{
        width: 100,
        height: 100,
    },
    logo: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
        
    },
    
  });

  export default styles;
  