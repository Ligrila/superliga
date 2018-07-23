import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native';


import { 
  Container,
  Content,
  Header,
  Body
} from 'native-base'
import { DrawerItems,SafeAreaView } from 'react-navigation'



export const SidebarDrawerContentComponent = (props) => (
    <Container style={styles.container}>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../../assets/images/robot-dev.png')} />
      </Body>
      </Header>
      <Content>
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <Content>
              <DrawerItems {...props} />
            </Content>
          </SafeAreaView>
        </ScrollView>
      </Content>
    </Container>

);


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      height: 200,
      backgroundColor: "black"
    },
    drawerImage: {
      height: 150,
      width: 117.75,
      borderRadius: 0
    }
  
  })
  

  