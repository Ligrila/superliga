import Layout from '../../constants/Layout';

export default {
    content:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width: '80%'

    },
    title:{
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: Layout.s(40),
        marginTop: Layout.h(50)
    },
    form:{
        width:'100%',
        
        

    },
    item:{
        marginTop: Layout.h(20),
        



    },
    pickerText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(40)
    },
    pickerItemText:{
        color: '#282828'
    },
    placeholder:{
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(40),
        color:'#fff',
    },
    input:{
        fontSize: Layout.s(40),
        width:'90%',
        
        alignItems:'flex-start',
        fontFamily: 'OpenSansCondensed_light',
    },
    submitButton:{
        backgroundColor: '#7b4294',
        marginTop: Layout.h(40),
    },
    submitButtonText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: Layout.s(35)
    },

}