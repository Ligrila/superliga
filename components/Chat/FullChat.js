import React, { Component } from 'react'
import Reflux from 'reflux'
import { View,KeyboardAvoidingView } from 'react-native'


import {connectStyle,Text, Form, Input, Item, Icon,Button} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import { ChatStore, ChatActions } from '../../store/ChatStore';
import Message from './Message';
import { SafeAreaView } from 'react-navigation';



class FullChat extends Reflux.Component {
  state = {
      showForm: true,
      message: null
  }
  constructor(props){
      super(props)
      this.store = ChatStore
  }


  
  showForm = () =>{
      showForm = true
      this.setState({showForm})
  }
  clear = () => {
    this.input._root.clear();
  }


  sendMessage = ()=>{
    if(!this.state.message){
        return
    }
    ChatActions.sendMessage(this.state.message);
    this.setState({message:null});
    this.clear();
  }
  renderForm(){
    if(!this.state.showForm){
        return null
    }
    const styles = this.props.style
    const disabledStyles = this.state.message ? {} : {opacity:0.5}
    const buttonIconStyles = {
        ...styles.formSendIcon,
        ...disabledStyles
    }

    return(

        <Form style={styles.form}>
            <Item rounded style={styles.formInput}>
            <Input
                onBlur={this.hideForm}
                autoFocus={false}
                maxLength={100}
                returnKeyType='send'
                onChangeText={(message) => this.setState({message})}
                onSubmitEditing={this.sendMessage}
                style={styles.formInputText}
                ref={component => this.input = component}
            ></Input>
            </Item>
            <Button disabled={!this.state.message} icon transparent style={styles.formSend} onPress={this.sendMessage}>
                    <Icon type="Ionicons" name="ios-send" style={buttonIconStyles} />
            </Button>
        </Form>

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
  close = ()=>{
    if(this.props.closeChatDrawer){
        console.log("close chat drawer")
        this.props.closeChatDrawer()
        return
    }
  }
  render() {
    const styles = this.props.style
    const b = Layout.isAndroid ? null : 'padding'

    return (


        <KeyboardAvoidingView behavior={b} enabled style={styles.container}>
        <LinearGradient 
        start={[0,0]}
        end={[0,0.8]}
        colors={['#371655','#552a7d']} style={styles.gradient}>
        <SafeAreaView>
            <View style={styles.title}>
                <Button icon transparent onPress={this.close}>
                    <Icon type="Ionicons" name="ios-arrow-back" style={styles.iconTitle} />
                </Button>

                    <Icon type="Ionicons" name="ios-chatboxes" style={styles.iconTitle} />


            </View>
        </SafeAreaView>
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
        </KeyboardAvoidingView>
        
        



    )
  }
}
export default connectStyle('SuperLiga.FullChat')(FullChat);