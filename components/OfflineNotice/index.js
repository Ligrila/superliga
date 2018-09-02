import React from 'react';
import Reflux from 'reflux';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { ConnectionStatusStore } from '../../store/ConnectionStatusStore';
const { width } = Dimensions.get('window');
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Sin conexión a internet</Text>
    </View>
  );
}
class OfflineNotice extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = ConnectionStatusStore
    }
  render() {
      if(this.state.ConnectionStatus.connected){
          return null;
      }
      return <MiniOfflineSign />;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;