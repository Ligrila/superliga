import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const widthTarget = 750;
const ratio =  ((width * 100 )/ widthTarget)/100;
if(ratio > 1){
  ratio = 1; // no maximize images
}
export default {
  window: {
    width,
    height,
    ratio
  },
  
  isSmallDevice: width < 375,
};
