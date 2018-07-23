import React from 'react';
import Reflux from 'reflux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';

import { Container, Content } from 'native-base'
import slugify from 'slugify';

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import CountDown from '../components/CountDown';

import Api from '../api/Api';

import {TriviaStore,TriviaActions} from '../store/TriviaStore';



import bgSrc from '../assets/images/bg.png';


export default class HomeScreen extends Reflux.Component {
  static navigationOptions = {
    title: "Home"
  };
  api = new Api;
  trivia = null;

  state = {
    isLoading: true,
    token: "",
    nextTrivia:{success:false,data:{}}
  };
	constructor(props) {
    super(props);
		this.store = TriviaStore;
	}
  async componentDidMount() {
       this._userToken().then((s)=>{
      this.setState({token:s});
    });

    await TriviaActions.nextTrivia();
    this.setState({isLoading:false});

  }

  async _userToken () {
    var ret = await AsyncStorage.getItem('token');
    return ret;
  };
  renderNextTrivia(){
    if(!this.state.nextTrivia||!this.state.nextTrivia.success) return null;

    const localImageStr = '../assets/images/teams/patronato.png';
    const visitImageStr = '../assets/images/teams/colon.png';
    const localImage = require(localImageStr);
    const visitImage = require(visitImageStr);
    const date = new Date(this.state.nextTrivia.data.start_datetime);
    var until = ( date.getTime() - new Date().getTime()) / 1000;
    return(
      <View>
        <CountDown until={until} />
        <Text><Image source={localImage} /> VS <Image source={visitImage} /></Text>
        <Text>{this.state.nextTrivia.data.local_club.name} VS {this.state.nextTrivia.data.visit_club.name}</Text>
      </View>
      
    );
  }
  render() {
    if (this.state.isLoading) {
      return <View><ActivityIndicator></ActivityIndicator></View>;
    }
    return (
          <Container>
            <Wallpaper source={bgSrc}>
            <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
            <Content>
                 {this.renderNextTrivia()}
            </Content>
            </Wallpaper>
          </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
