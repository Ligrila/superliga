import React, { Component } from 'react'
import { View,KeyboardAvoidingView } from 'react-native'

import {connectStyle,Text, Form, Input, Item, Icon,Button} from 'native-base'
import { LinearGradient } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';


class Chat extends Component {
  state = {
      showForm: false
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
  renderForm(){
    if(!this.state.showForm){
        return null
    }
    const b = Layout.isAndroid ? null : 'padding'
    return(
        <KeyboardAvoidingView behavior={b} enabled>
        <Form>
            <Item rounded>
            <Input
                onBlur={this.hideForm}
                autoFocus={true}
            ></Input>
            </Item>
        </Form>
        </KeyboardAvoidingView>
    )
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
            <ScrollView style={styles.messageContainer}>
                <Text> textInComponent </Text>
                {this.renderForm()}
            </ScrollView>
        </LinearGradient>
        {this.renderFormTrigger()}
        </KeyboardAvoidingView>

    )
  }
}
export default connectStyle('SuperLiga.Chat')(Chat);