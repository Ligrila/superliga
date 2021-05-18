import React from 'react';
// Native
import { Share, Image, View } from 'react-native';
// Native Base
import {
  List,
  ListItem,
  Left,
  Body,
  Text,
  Right,
  Button,
  Icon,
  Content,
  ActionSheet
} from 'native-base'
// Comonents
import Title from '../Title/Title';
import Notice from '../Notice/Notice';
// Linking
import * as Linking from "expo-linking";
// Navigation
import { useNavigation } from '@react-navigation/native';
// Recoil
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
// Styles
import styles from './ChampionshipList.styles'
import { ScrollView } from 'react-native-gesture-handler';
const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')



const ChampionshipList = ({ championships }) => {
  // Auth user
  const authUser = useRecoilValue(authUserAtom)
  // Navigation
  const navigation = useNavigation();
  // Share
  const onShare = (c) => {
    let shareUrl = Linking.makeUrl('championships/' + c.id)
    if (shareUrl.startsWith("jugadasuperliga://")) {
      shareUrl = shareUrl.replace("jugadasuperliga://", 'https://www.jugadasuperliga.com/')
    }
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: "Hola te invito a mi torneo de amigos '" + c.name + "', para participar has click aquí " + shareUrl
      }
    );
  }


  const onEdit = (championship) => {
    navigation.navigate("ChampionshipEdit", { championship })
  }
  const onEditUsers = (championship) => {
    navigation.navigate("ChampionshipEditUsers", { championship })
  }
  const viewItem = (championship) => {
    navigation.navigate("ChampionshipView", { championship })
  }
  const onChallenge = (championship) => {
    navigation.navigate("ChallengeCreate", { championship })
  }
  const actionSheets = (championship) => {
    const BUTTONS = ["Editar", "Participantes", "Invitar", "Desafiar con este torneo", "Cancelar"];
    const DESTRUCTIVE_INDEX = 4;
    const CANCEL_INDEX = 5;
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Opciones"
      },
      buttonIndex => {

        switch (buttonIndex) {
          case 0: onEdit(championship); break;
          case 1: onEditUsers(championship); break;
          case 2: onShare(championship); break;
          case 3: onChallenge(championship); break;
          default: break;
        }

      }
    );
  }
  const renderItems = () => {
    if (!championships) {
      return null
    }
    if (!championships.data || championships.data.length == 0) {
      return (
        <Notice text="No estás inscripto a ningún torneo." />
      )
    }


    const items = championships.data.map((championshipUsers, index) => {
      const championship = championshipUsers.championship
      const button = () => {
        return (
          <Button transparent onPress={() => actionSheets(championship)}>
            <Icon name="gear" style={styles.icon} type="FontAwesome" />
          </Button>
        )
      };
      const buttonRender = (championship.user_id == authUser.id) ? button() : null;
      const itemStyle = index === 0 ? { ...styles.listItemFirst, ...styles.listItem } : styles.listItem;
      let avatar = trophyAvatarSrc;
      const ranking = championship.championships_ranking ? championship.championships_ranking.position : 'Sin puntos '
      if (championship.avatar) {
        avatar = { uri: championship.avatar };
      }
      return (

        <ListItem avatar button style={itemStyle} key={championship.id} onPress={() => viewItem(championship)}>
          <Left>
            <View style={styles.thumbnail} >
              <Image source={avatar} style={styles.thumbnailImg} />
            </View>
          </Left>
          <Body>
            <Text style={styles.championshipName}>{championship.name}</Text>
            <Text style={styles.text}>Organizado por {championship.user.first_name} {championship.user.last_name}{'\n'}
              {championship.users_count} particpantes{'\n'}
              {ranking} en el ranking general

            </Text>
          </Body>
          <Right>
            {buttonRender}
          </Right>
        </ListItem>
      )
    })
    return items;
  }

  return (
    <View style={styles.container}>
      <Title text={'TORNEOS \n SUPERLIGA'} hideSeparator={true} />
      <ScrollView style={styles.scrollContainer}>
        <List style={styles.list}>
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
        </List>
      </ScrollView>
    </View>
  );

}


export default ChampionshipList;