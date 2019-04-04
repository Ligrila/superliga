import React from 'react';
import Reflux from 'reflux';
import {
    Image,
    ScrollView,
    View,
} from 'react-native';

import { 
  connectStyle,
  Container,
  Content,
  Header,
  Text,
  Icon,
  Body
} from 'native-base'

import { DrawerItems,SafeAreaView } from 'react-navigation'

import bgSrc from '../../assets/images/sidebar_bg.png';
import Wallpaper from '../Wallpaper';
import { UsersStore } from '../../store/UserStore';
import UserAvatar from '../UserAvatar';


class _SidebarItem extends React.Component{
  render(){
    const styles = this.props.style;
    const icon = this.props.icon;
    //<Image source={source} style={styles.sidebarItemImage}></Image>
    if(icon){
      return(
          <View style={styles.sidebarItemStyle}>
              <Icon type="FontAwesome" name={icon}  style={styles.sidebarItemIcon}/>
              <Text style={styles.sidebarItemLabel}>{this.props.label.toUpperCase()}</Text>
          </View>
        ); 
    }
    return(
    <View>
      <Text style={styles.sidebarItemLabel}>
        {this.props.label}
      </Text>
    </View>
    );
  }
}

export const SidebarItem = connectStyle('SuperLiga.Sidebar')(_SidebarItem);

class Sidebar extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = UsersStore;
  }
  getLabel = (scene) =>{
    const styles = this.props.style;
    const label = this.props.items.getLabel(scene);

    if(!label){
      return;
    }
    return  (
      <View style={styles.sidebarItem}>
            {label}
      </View>
    );
  }
  render(){
    const styles = this.props.style;
    if(!this.state.hasInformation){
      return <View />;
    }
    let points = 0;
    if(this.state.user&&this.state.user.point){
      points = this.state.user.point.points;
    }
    return (
      <Container style={styles.container}>
      <Wallpaper source={bgSrc}>
      <ScrollView style={styles.scrollContainer}>
      <Header transparent style={styles.header}>
        <Body style={styles.headerBody}>
          <Text style={styles.userText}>{this.state.user.first_name} {this.state.user.last_name}</Text>
          <Text style={styles.userPoints}>{points} Puntos</Text>
          <View  style={styles.userAvatar}>
            <UserAvatar avatar={this.state.user.avatar}/>
          </View>
        </Body>
        </Header>
        <Content padder style={styles.content}>
            <SafeAreaView forceInset={{ top: 'never', horizontal: 'never' }} style={styles.itemsContainer}>
                <DrawerItems {...this.props.items} 
                getLabel={this.getLabel}
                style={styles.drawerItems}
                activeBackgroundColor='transparent'
                />
            </SafeAreaView>
        </Content>
        </ScrollView>
        </Wallpaper>
      </Container>
    )
  }
}

Sidebar = connectStyle('SuperLiga.Sidebar')(Sidebar);


export const SidebarDrawerContentComponent = (props) => (
  <Sidebar items={props} />

);


