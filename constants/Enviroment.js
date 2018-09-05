import { Constants } from 'expo'

//variables de entorno
// ver: https://docs.expo.io/versions/latest/distribution/release-channels
// ver: https://medium.com/@peterpme/environment-variables-in-expo-using-release-channels-4934594c5307
// para pruebas con testers ej:
// exp publish --release-channel staging-0.1.0

import localEnviroment from './Enviroment.local';



const ENV = {
  // TODO: crear archivo separado para configurar el enviroment local
  dev: {
    ...localEnviroment
  },
  staging: {
    socketUrl: 'https://www.jugadasuperliga.com/wss',
    apiUrl: 'https://www.jugadasuperliga.com',
    androidClientId: '190225167822-mr7k6a28m4u8va61l8q7i3l56bbju50j.apps.googleusercontent.com',
    iosClientId: '190225167822-3he321e8jqcbfbdprv2u81cbu9jmfkvj.apps.googleusercontent.com',
  },
  prod: {
    socketUrl: 'https://www.jugadasuperliga.com/wss',
    apiUrl: 'https://www.jugadasuperliga.com',
    androidClientId: '190225167822-mr7k6a28m4u8va61l8q7i3l56bbju50j.apps.googleusercontent.com',
    iosClientId: '190225167822-3he321e8jqcbfbdprv2u81cbu9jmfkvj.apps.googleusercontent.com'
  }
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return {...ENV.dev,channel:'local-development 0.1'}
  if (env.indexOf('dev') !== -1) return {...ENV.dev,channel:env}
  if (env.indexOf('staging') !== -1) return {...ENV.staging,channel:env}
  if (env.indexOf('prod') !== -1) return {...ENV.prod,channel:env}
}


export default getEnvVars(Constants.manifest.releaseChannel)