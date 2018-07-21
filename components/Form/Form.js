import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../assets/images/form/username.png';
import passwordImg from '../../assets/images/form/password.png';
import eyeImg from '../../assets/images/form/eye_black.png';

export default class Form extends Component {
  static defaultProps = {
    password:'asdasd',
    email:'test@mocla.us',
  }
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: null,
      password: null
    };
    this.showPass = this.showPass.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  async onEmailChange(email){
    await  this.setState({email});
    if(this.props.onChange){
      this.props.onChange(this.state);
    }
  }
  async onPasswordChange(password){
    await this.setState({password});
    if(this.props.onChange){
      this.props.onChange(this.state);
    }
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          value={this.props.email}
          onChangeText={this.onEmailChange}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={this.onPasswordChange}
          value={this.props.password}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  btnEye: {
    position: 'absolute',
    top: 60,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
