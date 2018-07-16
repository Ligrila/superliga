import React from 'react';
import {
    StyleSheet,
    Image,
    Container,
    Content,
    Header,
    Text,
    Body
} from 'react-native';



import { DrawerItems } from 'react-navigation'

export const SidebarDrawerContentComponent = (props) => (
    <Container>
      <Header style={styles.drawerHeader}>

        <Body>
          <Image
            style={styles.drawerImage}
            source={require('../../assets/images/robot-dev.png')} />
        </Body>
      </Header>
      <Content>
      <Text>SuperLiga</Text>
       <DrawerItems {...props} />
      </Content>
  
    </Container>
  
  );


const styles = StyleSheet.create({
    drawerHeader: {
      height: 200,
      backgroundColor: "#0055ff"
    },
    drawerImage: {
      height: 150,
      width: 117.75,
      borderRadius: 0
    }
  
  })
  