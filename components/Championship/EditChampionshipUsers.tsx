import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { List, ListItem, Text, Left, Body, Right, Switch, Toast } from 'native-base'
import Title from '../Title';
import Avatar from '../Avatar/Avatart';
// Styles
import styles from './EditChampionshipUsers.styles'
import Variables from '../../styles/Variables'
import Api from '../../api/Api';

const EditChampionshipUsers = ({ championship }) => {
  const api = new Api();
  const [users, setUsers] = useState<any>([])
  const fetchUsers = useCallback(() => {
    const users = Object.assign([], championship.championship_users);
    setUsers(users)
  }, [championship])
  useEffect(() => {
    if (championship && championship.championship_users) {
      console.log('call')
      fetchUsers()
    }
  }, [championship])

  const toggleUser = async (item, v, index) => {
    const response = await api.toggleChampionshipUser(item.user.id, championship.id, v);
    if (response && response.success) {
      users[index].enabled = v
      setUsers([...users]);
    } else {
      Toast.show({
        text: 'Oops..Ha ocurrido un error intentalo mas tarde.',
        position: "top",
        type: 'danger',
        buttonText: 'Aceptar'
      });
    }
  }
  const removeButton = (item, index) => {
    if (championship.user_id == item.user.id) {
      return null;
    }
    
    return <Switch
            ios_backgroundColor={'#eee'}
            value={item.enabled}
            onValueChange={(v) => { toggleUser(item, v, index) }}
    />

  }
  const renderOwner = () => {
    if (!users) {
      return;
    }
    // Not Admin
    return users
      .filter(item => item.user.id === championship.user_id )
      .map(
      (item, index) => {

        return (
          <ListItem icon key={item.user.id}>
            <Left>
              <Avatar mini avatar={{ uri: item.user.avatar }}></Avatar>
            </Left>
            <Body>
              <Text>{item.user.first_name} {item.user.last_name}</Text>
            </Body>
            <Right>
              
            </Right>
          </ListItem>
        )
      }
    )
  }
  const renderItems = () => {
    if (!users) {
      return;
    }
    // Not Admin
    return users
      .filter(item => item.user.id !== championship.user_id )
      .map(
      (item, index) => {

        return (
          <ListItem icon key={item.user.id}>
            <Left>
              <Avatar mini avatar={{ uri: item.user.avatar }}></Avatar>
            </Left>
            <Body>
              <Text>{item.user.first_name} {item.user.last_name}</Text>
            </Body>
            <Right>
              {removeButton(item, index)}
            </Right>
          </ListItem>
        )
      }
    )
  }
  if (!championship) {
    return null;
  }

  const title = `EDITAR PARTICIPANTES\n ${championship.name}`

  return (
    <View style={styles.container} >
      <Title text={title}></Title>
      <List>
        {renderOwner()}
        {renderItems()}
      </List>
    </View>
  );

}


export default EditChampionshipUsers;