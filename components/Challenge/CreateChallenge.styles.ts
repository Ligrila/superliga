
import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    listHeader:{
        height: 50
    },
    list:{
    },
    
    text:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize:ThemeUtility.s(30),
        textAlign: 'center'
    },
    buttonText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize:ThemeUtility.s(25)

    },
    row:{
        flexDirection: 'row',
        flex:1,
        marginTop: ThemeUtility.h(10),
    },
    colh1:{
        flex:0.2,
    },
    colh2:{
        flex:0.4,
    },
    colh3:{
        flex:0.3,
    },
    col1:{
        flexDirection: 'column',
        flex:0.3,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: ThemeUtility.s(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    col2:{
        flexDirection: 'column',
        flex:0.2,
        backgroundColor: '#264870',
        padding: ThemeUtility.s(20),
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },
    col3:{
        marginLeft: ThemeUtility.s(5),
        flexDirection: 'column',
        flex:0.2,
        backgroundColor: '#153f72',
        padding: ThemeUtility.s(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    col4:{
        flexDirection: 'column',
        flex:0.3,
        backgroundColor: '#539ecd',
        padding: ThemeUtility.s(20),
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles; 
