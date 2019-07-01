import React, { Component } from 'react'
import FullChat from '../Chat/FullChat'

import {KeyboardAvoidingView} from 'react-native'
import Layout from '../../constants/Layout';



export class ChatSidebarDrawerContentComponent extends Component {
  componentWillMount(){
    this.setState({drawerLockMode:'locked-open'});
  }
  render() {
    const b = Layout.isAndroid ? null : 'position'
    return (
      <KeyboardAvoidingView behavior={b} enabled >
        <FullChat />
        </KeyboardAvoidingView>
    )
  }
}
