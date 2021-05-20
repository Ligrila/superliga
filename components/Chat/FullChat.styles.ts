import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingBottom: 0,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Layout.s(30),
        paddingLeft: Layout.s(10),
        paddingRight: Layout.s(20)
    },
    iconTitle: {
        color: '#fff',
    },
    messageContainer: {
        paddingLeft: Layout.s(40),
        paddingRight: Layout.s(20),
        marginVertical: 20
        // marginBottom: Layout.s(120),
    },

    formMessageTriggerIcon: {
        color: '#fff'
    },
    form: {
        paddingBottom: Layout.s(40),
        paddingLeft: Layout.s(40),
        paddingRight: Layout.s(20),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    formItem: {
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 10
    },
    formInputText: {
        color: Variables.dark,
    },
    formSend: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    formSendIcon: {
        fontSize: Layout.s(50),
        color: Variables.dark,
    },


});

export default styles;
