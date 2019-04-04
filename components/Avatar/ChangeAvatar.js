import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native'
import { connectStyle,Text,ActionSheet } from 'native-base'
import {Permissions,ImagePicker} from 'expo'


class ChangeAvatar extends Component {
    onChangeImage = (avatar) =>{
        console.log({avatar})
        if(this.props.onChange){
            this.props.onChange(avatar.uri)
        }

    }
    _actionSheet = ()=>{
        const BUTTONS = ["Seleccionar de galeria", "Tomar foto", "Cancelar"];
    
        const CANCEL_INDEX = 2
        ActionSheet.show(
          {
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            title: "Cambiar imagen"
          },
          buttonIndex => {
            if(buttonIndex==0){
              this._pickImage();
            }
            if(buttonIndex==1){
              this._takePhoto();
            }
          }
        )
      }
    
      _checkPermissions = async ()=>{
    
      return await Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL),
      ])
        .then(r => r.filter(o => o.status === 'granted'))
        .then(permissions => {
          if (permissions.length !== 2) {
            return false;
          }
          return true;
        });
      }
    
      _takePhoto = async () => {
        
        const c = await this._checkPermissions();
        if(!c){
          return;
        }
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
    
    
        if (!result.cancelled) {
          this.onChangeImage(result);
        }
      }
      _pickImage = async () => {
          const c = await this._checkPermissions();
          if(!c){
            return;
          }
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
          });
    
    
          if (!result.cancelled) {
            this.onChangeImage(result);
          }
        }

  render() {
    const styles = this.props.style;
    return (
        <TouchableOpacity 
        onPress={this._actionSheet}
        style={styles.changeAvatarButton}
        >
        <Text style={styles.changeAvatarButtonText}> Editar imagen 
        </Text>
        <Text> {"\n"}</Text>
        </TouchableOpacity>
    )
  }
}

export default connectStyle('SuperLiga.ChangeAvatar')(ChangeAvatar);