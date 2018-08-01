import React from 'react';
import {
    StyleSheet,
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


class SidebarItem{
  render(){
    <Text style={styles.sidebarItemLabel}>
      {this.props.label}
    </Text>
  }
}

class Sidebar extends React.Component{
  constructor(props){
    super(props);
  }
  getLabel = (scene) =>{
    const styles = this.props.style;
    const label = this.props.items.getLabel(scene);
    if(!label){
      return;
    }
    return  (
      <View style={styles.sidebarItem}>
          <View>{label}</View>
      </View>
    );
  }
  render(){
    const styles = this.props.style;
    return (
      <Container style={styles.container}>
      <Wallpaper source={bgSrc}>
      <ScrollView style={styles.scrollContainer}>
      <Header transparent style={styles.header}>
        <Body style={styles.headerBody}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/robot-dev.png')} />
        </Body>
        </Header>
        <Content padder style={styles.content}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={styles.itemsContainer}>
                <DrawerItems {...this.props.items} 
                getLabel={this.getLabel}
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
//SidebarItem = connectStyle('SuperLiga.Sidebar')(SidebarItem); // TODO:

export const SidebarDrawerContentComponent = (props) => (
  <Sidebar items={props} />

);


