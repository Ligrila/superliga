import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const platform = Platform.OS;

const widthTarget = 750;
const heightTarget = 1334;
const ratio =  ((width * 100 )/ widthTarget)/100;
const heightRatio =  ((height * 100 )/ heightTarget)/100;
if(ratio > 1){
  //ratio = 1; // no maximize images
}
if(heightRatio > 1){
  //heightRatio = 1; // no maximize images
}

if(Platform.isPad){
  // si es ipad el alto es el menor de los dos. Para que se vea bien utilizamos el alto.
  ratio = heightRatio;
}

const isIphoneX =
  platform === "ios" && (height === 812 || width === 812);

export default {
  window: {
    width,
    height,
    ratio,
    heightRatio
  },
  isAndroid: platform === "android",
  isSmallDevice: width < 375,
  isIphoneX: isIphoneX
};



