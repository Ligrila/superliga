import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Form,
  Input,
  Icon,
  Button,
  Toast,
  Item,
  Label
}
  from 'native-base'

import Title from '../Title/Title';
import { CreateChampionshipStore, CreateChampionshipActions } from '../../store/CreateChampionshipStore';
import Loader from '../Loader';
import Avatar from '../Avatar';
import ChangeAvatar from '../Avatar/ChangeAvatar';
import { ChampionshipsActions } from '../../store/ChampionshipsStore';

// Styles
import styles from './CreateChampionship.styles'
import Api from '../../api/Api';
import { useNavigation } from '@react-navigation/native';
const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')

interface CreateChampionshipProps {
  id?: string
}

const CreateChampionship = ({ id }: CreateChampionshipProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const api = new Api();
  const navigation = useNavigation();
  // const [picture, setPicture] = useState('');
  // state = {
  //   id: null,
  //   name: null,
  //   picture: null,
  //   pictureChanged: false,
  // }
  // editMode = false;
  // constructor(props) {
  //   super(props);
  //   this.editMode = this.props.editMode || false
  //   if (props.championship) {
  //     this.state = props.championship;
  //     this.state.picture = props.championship.avatar
  //   }
  //   this.store = CreateChampionshipStore;

  // }

  // componentDidMount(){
  //   if (this.editMode) {
  //     CreateChampionshipActions.edited.listen(async (championship) => {
  //       ChampionshipsActions.list();
  //       this.props.navigation.navigate('ChampionshipHome')
  //     })
  //   } else {
  //     CreateChampionshipActions.created.listen(async (championship) => {
  //       this.props.navigation.navigate('ChampionshipView', { championship: championship, created: true })
  //     })
  //   }
  // }
  const handlerOnChangeName = (name) => {
    setName(name)
  }
  // const handlerOnChangePicture = (picture) => {
  //   // const pictureChanged = true
  //   // setPicture(picture);

  // }
  const createOrUpdate = async () => {
    try {
      setLoading(true);
      if (id) {

      } else {
        const response = await api.createChampionship(name);
        navigation.navigate('ChampionshipView', { championship: response.data, created: true })
      }
    }catch(e){
      Toast.show({
        text: 'Ha ocurrido un error. Por favor intente mas tarde.',
        position: "bottom",
        type: 'danger',
        buttonText: 'Aceptar'
      });
    }finally{
      setLoading(false);
    }
}
  const onNextClick = async () => {
    if (!name) {
      Toast.show({
        text: 'Por favor escribe un nombre',
        position: "bottom",
        type: 'danger',
        buttonText: 'Aceptar'
      });
      return;
    }
    await createOrUpdate();
  }





  const title = id ? 'EDITAR \n TORNEO' : 'CREA TU TORNEO \n LIGA PROFESIONAL'
  return (
    <View style={styles.container} >
      <Title text={title} hideSeparator={true}></Title>
      <Loader loading={loading} />
      <Form style={styles.form}>
        {/* <Avatar avatar={avatar}></Avatar>
        <ChangeAvatar onChange={handlerOnChangePicture}></ChangeAvatar> */}
        <Label style={styles.label}>Nombre del torneo:</Label>
        <Item style={styles.item}>
          <Input
            placeholder='Ingrese el nombre del torneo'
            style={styles.input}
            placeholderTextColor={styles.placeholder.color}
            onChangeText={handlerOnChangeName}
            value={name}
          />
        </Item>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={onNextClick}
            disabled={loading}
          >
            <Icon name="md-arrow-forward" type="Ionicons" style={styles.buttonIcon} />
          </Button>
        </View>
      </Form>
    </View>
  );

}


export default CreateChampionship;