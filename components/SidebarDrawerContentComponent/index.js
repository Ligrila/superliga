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
  Body
} from 'native-base'

import { DrawerItems,SafeAreaView } from 'react-navigation'

import bgSrc from '../../assets/images/sidebar_bg.png';
import Wallpaper from '../Wallpaper';
import { UsersStore } from '../../store/UserStore';


class _SidebarItem extends React.Component{
  render(){
    const styles = this.props.style;
    const source = this.props.source;
    if(source){
      return(
          <View style={styles.sidebarItemStyle}>
            <Image source={source} style={styles.sidebarItemImage}></Image>
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
    return (
      <Container style={styles.container}>
      <Wallpaper source={bgSrc}>
      <ScrollView style={styles.scrollContainer}>
      <Header transparent style={styles.header}>
        <Body style={styles.headerBody}>
          <Text>{this.state.user.first_name} {this.state.user.last_name}</Text>
          <Text>{this.state.user.points[0].points} Puntos</Text>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{uri:this.state.user.avatar}} />
            </View>
        </Body>
        </Header>
        <Content padder style={styles.content}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={styles.itemsContainer}>
                <DrawerItems {...this.props.items} 
                getLabel={this.getLabel}
                style={styles.drawerItems}
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


