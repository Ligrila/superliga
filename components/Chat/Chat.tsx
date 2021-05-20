import React, { useContext, useRef, useState } from "react";
import { View } from "react-native";
import {
  Form,
  Input,
  Item,
  Icon,
  Button,
  Toast,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Message from "./Message";

import styles from './Chat.styles'
import { useRecoilValue } from "recoil";
import { chatMessagesAtom } from "../../recoil/Chat.recoil";
import { SocketContext } from "../Socket/SocketContextProvider";
import { LinearGradient } from 'expo-linear-gradient'



const Chat = (props) => {
  const chatMessages = useRecoilValue(chatMessagesAtom)
  const scrollViewRef = useRef<any>(null)
  const [showForm, setShowForm] = useState(false);
  const socket: any = useContext(SocketContext)


  const onPressHideForm = () => {
    setShowForm(false);
    props.onShowForm(false)
    
  };
  const onPressShowForm = () => {
    setShowForm(true);
    props.onShowForm(true)
  };
  const renderFormTrigger = () => {

    return (
      <View style={styles.formTrigger}>
        <Button transparent onPress={onPressShowForm}>
          <Icon
            type="MaterialIcons"
            name="message"
            style={styles.formMessageTriggerIcon}
          ></Icon>
        </Button>
      </View>
    );
  }
  const sendMessage = async (e) => {
    if (socket) {
      socket.client.emit('broadcast', e.nativeEvent.text);
    } else {
      Toast.show({
        text: 'Oops..Ha ocurrido un error intentalo mas tarde.',
        position: "top",
        type: 'danger',
        buttonText: 'Aceptar'
      });
    }
  };
  const renderForm = () => {

    return (
      <Form >
        <Item rounded style={styles.formItem}>
          <Input
            style={styles.formItemInput}
            onBlur={onPressHideForm}
            autoFocus={true}
            maxLength={100}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          ></Input>
        </Item>
      </Form>
    );
  }
  const renderMessages = () => {
    // console.log('chatMessages', chatMessages)
    if (chatMessages && chatMessages.length > 0) {
      return chatMessages.map((message, index) => (
        <Message key={index} message={message}></Message>
      ));
    }
    return null;
  }



  return (
    <>
      {showForm &&
        <LinearGradient
          start={[0, 0]}
          end={[0, 0.6]}
          colors={['transparent', 'rgba(2,26,56,0.7)', '#021a38']} 
          style={styles.gradient}>
          <ScrollView
            style={styles.messageContainer}
            ref={scrollViewRef}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}
          >
            {renderMessages()}
          </ScrollView>
          {renderForm()}
        </LinearGradient>}
      {!showForm && renderFormTrigger()}
    </>
  );

}
export default Chat;
