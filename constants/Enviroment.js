import { Constants } from 'expo'

//variables de entorno
// ver: https://docs.expo.io/versions/latest/distribution/release-channels
// ver: https://medium.com/@peterpme/environment-variables-in-expo-using-release-channels-4934594c5307
// para pruebas con testers ej:
// exp publish --release-channel staging-0.1.0


const ENV = {
  dev: {
    socketUrl: 'http://localhost:8889/api',
    apiUrl: 'http://php/superliga',
  },
  staging: {
    socketUrl: 'http://superliga.mocla.us/wss',
    apiUrl: 'http://superliga.mocla.us',
  },
  prod: {
    socketUrl: 'http://superliga.mocla.us/wss',
    apiUrl: 'http://superliga.mocla.us',
  }
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return {...ENV.dev,channel:'local-development 0.1'}
  if (env.indexOf('dev') !== -1) return {...ENV.dev,channel:env}
  if (env.indexOf('staging') !== -1) return {...ENV.staging,channel:env}
  if (env.indexOf('prod') !== -1) return {...ENV.prod,channel:env}
}


export default getEnvVars(Constants.manifest.releaseChannel)