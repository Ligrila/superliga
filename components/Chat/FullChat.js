import React, { Component } from 'react'
import Reflux from 'reflux'
import { View,KeyboardAvoidingView } from 'react-native'


import {connectStyle,Text, Form, Input, Item, Icon,Button, H1} from 'native-base'
import { LinearGradient } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import { ChatStore, ChatActions } from '../../store/ChatStore';
import Message from './Message';
import { SafeAreaView } from 'react-navigation';


class FullChat extends Reflux.Component {
  state = {
      showForm: true
  }
  constructor(props){
      super(props)
      this.store = ChatStore
  }


  hideForm = () =>{
      return;
    showForm = false
    this.setState({showForm})
    }
  showForm = () =>{
      showForm = true
      this.setState({showForm})
  }
  renderFormTrigger(){
      if(this.state.showForm){
          return null
      }

      const styles = this.props.style
      return(
        <View style={styles.formTrigger}>
            <Button transparent onPress={this.showForm}>
                <Icon type='MaterialIcons' name='message' style={styles.formMessageTriggerIcon}></Icon>
            </Button>
        </View>
      )
  }
  sendMessage = (e)=>{
    ChatActions.sendMessage(e.nativeEvent.text)
  }
  renderForm(){
    if(!this.state.showForm){
        return null
    }
    const styles = this.props.style

    const b = "position"
    return(
        <SafeAreaView>
        <KeyboardAvoidingView behavior={b} enabled={false}>
        <Form style={styles.form}>
            <Item rounded style={styles.formInput}>
            <Input
                onBlur={this.hideForm}
                autoFocus={true}
                maxLength={100}
                returnKeyType='send'
                onSubmitEditing={this.sendMessage}
                style={styles.formInputText}
            ></Input>
            </Item>
        </Form>
        </KeyboardAvoidingView>
        </SafeAreaView>

    )
  }
  renderMessages(){
      let c = 0;
      if(this.state.Chat.hasData){
          return this.state.Chat.data.map(
              (message)=><Message key={c++} message={message}></Message>
          )
      }

      return null
  }
  render() {
    const styles = this.props.style
    const b = Layout.isAndroid ? null : 'padding'

    return (

        <View style={styles.container}>
        <LinearGradient 
        start={[0,0]}
        end={[0,0.8]}
        colors={['#371655','#552a7d']} style={styles.gradient}>
        <SafeAreaView>
            <KeyboardAvoidingView behavior={b} enabled style={styles.padder}>
            <H1>Chat</H1>
            <ScrollView style={styles.messageContainer}
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                {this.renderMessages()}
            </ScrollView>
            {this.renderForm()}
            </KeyboardAvoidingView>
        </SafeAreaView>
        </LinearGradient>
        
        {this.renderFormTrigger()}

        </View>

    )
  }
}
export default connectStyle('SuperLiga.FullChat')(FullChat);