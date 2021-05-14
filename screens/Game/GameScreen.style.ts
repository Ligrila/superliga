import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import Variables from '../../styles/Variables';

export default StyleSheet.create({
    game: {
        flex: .7,
    },
    footer: {
        borderTopWidth: 0,
        // elevation: 0,
    },
    connectedUsers: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: Layout.s(20),

    },
    noLifeText: {
        fontFamily: 'OpenSansCondensed_bold',
        color: Variables.brandPrimaryText,
        fontSize: Layout.s(35),
    }

});
    
