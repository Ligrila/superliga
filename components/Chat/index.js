import React, { Component } from 'react'
import Reflux from 'reflux'
import { View,KeyboardAvoidingView } from 'react-native'


import {connectStyle,Text, Form, Input, Item, Icon,Button} from 'native-base'
import { LinearGradient } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import { ChatStore, ChatActions } from '../../store/ChatStore';
import Message from './Message';


class Chat extends Reflux.Component {
  state = {
      showForm: false
  }
  constructor(props){
      super(props)
      this.store = ChatStore
  }


  hideForm = () =>{
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

    const b = Layout.isAndroid ? null : 'padding'
    return(
        <KeyboardAvoidingView behavior={b} enabled>
        <Form style={styles.form}>
            <Item rounded>
            <Input
                onBlur={this.hideForm}
                autoFocus={true}
                maxLength={100}
                returnKeyType='send'
                onSubmitEditing={this.sendMessage}
            ></Input>
            </Item>
        </Form>
        </KeyboardAvoidingView>
    )
  }
  renderMessages(){
      if(this.state.Chat.hasData){
          return this.state.Chat.data.map(
              (message)=><Message message={message}></Message>
          )
      }

      return null
  }
  render() {
    const styles = this.props.style
    const b =  'position'

    return (

        <KeyboardAvoidingView behavior={b} enabled style={styles.container}>
        <LinearGradient 
        start={[0,0]}
        end={[0,0.6]}
        colors={['transparent','rgba(2,26,56,0.7)','#021a38']} style={styles.gradient}>
            <ScrollView style={styles.messageContainer}
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                {this.renderMessages()}
            </ScrollView>
            {this.renderForm()}
        </LinearGradient>
        {this.renderFormTrigger()}
        </KeyboardAvoidingView>

    )
  }
}
export default connectStyle('SuperLiga.Chat')(Chat);