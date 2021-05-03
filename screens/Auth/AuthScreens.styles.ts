import { StyleSheet } from 'react-native';
import { Variables } from '../../styles';


export default StyleSheet.create({
    grid: {
        backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f2e2e'
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'LuloBold',
        marginTop: 20
    },
    headerSubTitle: {
        color: Variables.brandSecondary,
        fontSize: 15,
        marginTop: 15,
        fontFamily: Variables.brandFont
    },
    logo: {

    },
    form: {
        paddingHorizontal: 30,
        marginTop: 15
    },
    forgot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25,
        marginBottom: 25
    },
    formBtnContainer: {
        display:'flex',
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        marginTop: 20
    },
});