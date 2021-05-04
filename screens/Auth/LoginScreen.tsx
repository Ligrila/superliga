import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Facebook
import * as Facebook from 'expo-facebook';
// Google
import * as GoogleSignIn from 'expo-google-sign-in';
// Native Base
import {
  Container,
  Content,
  Button,
  Form,
  Item,
  Input,
  Text,
  Icon,
  Toast,
  Footer
} from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper'
import Loader from '../../components/Loader/Loader';
// Api
import Api from '../../api/Api';
import Enviroment from '../../constants/Enviroment';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Style
import styles from './LoginScreen.styles';
const bgSrc = require('../../assets/images/login/bg.png');
// Recoil
import { useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../recoil/atoms/Auth.atom';
import { authUserLivesAtom } from '../../recoil/atoms/Auth.atom';
// Helpers
import AuthHelper from '../../helpers/Auth/Auth.helper';
import AuthUtility from '../../utilities/Auth/Auth.utility';
const LoginScreen = () => {
  // Api
  const api = new Api;
  // Helpers
  const authHelper = new AuthHelper();
  // Recoil
  const setAuthUser = useSetRecoilState(authUserAtom);
  const setAuthUserLives = useSetRecoilState(authUserLivesAtom);
  // States 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Navigation
  const navigation = useNavigation();

  // const onForgotPassword = () => {
  //   navigation.navigate('Browser', { url: Enviroment.apiUrl + '/../users/forgot-password', return: 'Login' });

  // }
  // const onTermsAndConditions = () => {
  //   navigation.navigate('Browser', { url: Enviroment.apiUrl + '/../pages/display/terms-and-conditions', return: 'Login' });

  // }
  const onEmailChange = async (email) => {
    setEmail(email);
  }
  const onPasswordChange = async (password) => {
    setPassword(password);
  }

  // Check for messages
  // @TODO listen action 
  const checkForMessages = useCallback(async () => {
    const championshipId = await AsyncStorage.getItem('afterLoginChampionshipSubscribe');
    const messageOk = await AsyncStorage.getItem('afterLoginChampionshipSubscribeMessage');
    if (!messageOk && championshipId) {
      Toast.show({
        text: 'Parece que te han invitado a un torneo pero aun no has ingresado. Una vez que ingreses te inscribiremos.',
        position: "bottom",
        type: 'warning',
        buttonText: 'Aceptar',
        duration: 5000
      });
      AsyncStorage.setItem('afterLoginChampionshipSubscribeMessage', "ok");
    }
  }, [])
  // After Login Common Function
  const afterLogin = async () => {
    const championshipId = await AsyncStorage.getItem('afterLoginChampionshipSubscribe');
    if (championshipId) {
      AsyncStorage.removeItem("afterLoginChampionshipSubscribe")
      AsyncStorage.removeItem("afterLoginChampionshipSubscribeMessage")
      navigation.navigate('ChampionshipSubscribe', { championship: { id: championshipId } })
      return;
    }
    navigation.navigate('Main');
  }
  // Render Footer
  const renderFooter = () => {
    if (Enviroment.channel == '') {
      return null
    }
    return (
      <Footer>
        <Text>{Enviroment.channel}</Text>
      </Footer>
    )
  }

  // Google Login
  const googleLogin = async () => {
    let result: any = {}
    try {
      const clientId = Platform.OS === 'android' ? Enviroment.androidStandaloneAppClientId : Enviroment.iosStandaloneAppClientId

      try {
        console.log("Init GoogleSignIn");
        await GoogleSignIn.initAsync({ clientId: clientId });
      } catch ({ message }) {
        console.log('GoogleSignIn.initAsync(): ', message);
      }

      await GoogleSignIn.askForPlayServicesAsync();
      result = await GoogleSignIn.signInAsync();
      if (result.type === 'success') {
        result.accessToken = result.user.auth.accessToken;
      }

      if (result.type === 'success') {
        setLoading(true)
        const accessToken = result.accessToken;
        var user = await api.googleLogin(accessToken);
        if (user && user.success) {
          _beforeSubmitLogin(user);
        } else {
          console.warn("Error google login", user);
        }
      } else {
        //return {cancelled: true};
      }
    } catch (e) {
      //return {error: true};
      console.log("Error google login logInAsync", e);
    }
  }
  // Facebook Login
  const facebookLogin = async () => {
    await Facebook.initializeAsync('882017118635234')

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email'],
    }) as any;
    if (type === 'success') {
      setLoading(true);
      // Get the user's name using Facebook's Graph API
      /*console.log(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,first_name,last_name`);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=name,email,first_name,last_name`);
      var user = await response.json();
      console.log(user);*/
      const user = await api.facebookLogin(token);
      if (user && user.success) {
        _beforeSubmitLogin(user);
      } else {
        console.warn("Error facebook login", user);
      }
    }
  }
  // Twitter Login
  const twitterLogin = async () => {
    Alert.alert('No implementado')
  }
  // On Register
  const _onRegister = () => {
    navigation.navigate('Register');
  }
  /**
   * _beforeSubmitLogin
   * @param user response from api
   */
  const _beforeSubmitLogin = async (user) => {
    // Set token
    await AuthUtility.setToken(user.data);
    // Get User Auth
    const response = await api.getUserInformation();
    if (!response.success) {
      throw new Error('Response Api');
    }
    const authUserFormatted = authHelper.formatAuthUser(response);
    // Set Atom User
    setAuthUser(authUserFormatted);
    // Set Atom User Lives
    setAuthUserLives(authUserFormatted.lives);
    // After Login
    afterLogin();
  }

  const _onSubmit = async () => {
    try {
      setLoading(true);
      const user = await api.login(email, password).catch(e => {
        console.log('Exeption', e);
      });
      if (user && user.success) {
        await _beforeSubmitLogin(user);
      } else {
        Toast.show({
          text: 'Email o contraseña inválidos',
          position: "top",
          type: 'danger',
          buttonText: 'Aceptar'
        });
      }
    } catch (e) {
      Toast.show({
        text: 'Oops..Ha ocurrido un error intentalo mas tarde.',
        position: "top",
        type: 'danger',
        buttonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkForMessages();
    // LoginScreenActions.checkForMessages.listen(this.checkForMessages)
  }, [checkForMessages])
  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <Loader loading={loading} />
        <Content padder contentContainerStyle={styles.login}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Logueate con tu usuario {"\n"}
                  o crea una cuenta nueva:
            </Text>
            {/* Form */}
            <Form style={styles.form}>
              <Item style={[styles.item, styles.itemMargin]} >
                <Input style={styles.input} placeholder="usuario"
                  onChangeText={onEmailChange}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </Item>
              <Item style={styles.item}>
                <Input style={styles.input} placeholder="contraseña" secureTextEntry={true}
                  onChangeText={onPasswordChange}
                />
              </Item>
            </Form>
            <Button rounded block large onPress={_onSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Ingresar</Text>
            </Button>

            {/* <TouchableOpacity
              onPress={onForgotPassword}
            ><Text style={styles.registerSubTitle}>¿Olvidaste tu contraseña?</Text></TouchableOpacity> */}

            {/* Title */}
            <Text style={styles.registerTitle}>no tenes cuenta?</Text>

            <Button rounded block large info
              onPress={_onRegister} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Registrarme</Text>
            </Button>

            <View style={styles.socialLoginContainer}>
              <Text style={styles.socialLoginTitle}>O ingresa con:</Text>
              <View style={styles.socialLoginIcons}>
                <Button rounded light
                  onPress={facebookLogin}
                  style={styles.socialButton}>
                  <Icon name='facebook-f' type='FontAwesome' style={styles.socialButtonIcon} />
                </Button>
                <View style={styles.socialIconSeparator}></View>
                <Button rounded light onPress={twitterLogin} style={styles.socialButton}>
                  <Icon name='twitter' type='FontAwesome' style={styles.socialButtonIcon} />
                </Button>
                <View style={styles.socialIconSeparator}></View>
                <Button rounded light onPress={googleLogin} style={styles.socialButton}>
                  <Icon name='google-' type='Entypo' style={styles.socialButtonIcon} />
                </Button>
              </View>
            </View>
            {/* <View style={styles.termsAndConditionsContainer}>
              <TouchableOpacity
                onPress={onTermsAndConditions}
              ><Text style={styles.registerSubTitle}>Al ingresar aceptas nuestros términos y condiciones</Text></TouchableOpacity>
            </View> */}
          </View>
        </Content>
        {renderFooter()}
      </Wallpaper>
    </Container>
  );
}


export default LoginScreen;
