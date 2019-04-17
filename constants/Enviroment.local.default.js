import {  Platform } from 'react-native';
const isAndroid =  Platform.OS === "android";


export default {
        // conviene usar nombres de dominios
        // para poder probar correctamente mercadopago
        // internos y externos
        socketUrl: isAndroid ? 'http://10.0.2.2:8889': "http://localhost:8889",
        apiUrl: isAndroid ? 'http://10.0.2.2/superliga/api' : 'http://localhost/superliga/api',
        chatSocketUrl: isAndroid ? 'http://10.0.2.2:3000/chat': "http://localhost:3000/chat",
        androidClientId: '190225167822-hvfad06m4etnniv5n24s2mebab3o3o8d.apps.googleusercontent.com',
        androidStandaloneAppClientId: '190225167822-mr7k6a28m4u8va61l8q7i3l56bbju50j.apps.googleusercontent.com',
        iosClientId: '190225167822-57soj7t03jk5tvpp37b07gtar5itr4jd.apps.googleusercontent.com',
        iosStandaloneAppClientId: '190225167822-3he321e8jqcbfbdprv2u81cbu9jmfkvj.apps.googleusercontent.com',
}