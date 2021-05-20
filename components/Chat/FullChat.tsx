import React, { useContext, useRef, useState } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'


import { Form, Input, Item, Icon, Button, Toast, Content, Container } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import Message from './Message';
import { SafeAreaView } from 'react-navigation';


import { SocketContext } from '../Socket/SocketContextProvider'
import { chatMessagesAtom } from '../../recoil/Chat.recoil'
import { useRecoilValue } from 'recoil'
import { Ionicons } from '@expo/vector-icons';
import Wallpaper from '../Wallpaper/Wallpaper';

const bgSrc = require("../../assets/images/sidebar-bg.png");
import styles from './FullChat.styles';

const FullChat = (props) => {
    const [message, setMessage] = useState('');
    const socket: any = useContext(SocketContext)
    const chatMessages = useRecoilValue(chatMessagesAtom)
    const scrollViewRef = useRef<any>(null)
    const inputRef = useRef<any>(null)

    const clear = () => {
        setMessage('');
        if (inputRef) {
            inputRef.current._root.clear()
        }
    }
    const sendMessage = () => {
        if (!message) {
            return
        }
        if (socket) {
            socket.client.emit('broadcast', message);
            clear();
        } else {
            Toast.show({
                text: 'Oops..Ha ocurrido un error intentalo mas tarde.',
                position: "top",
                type: 'danger',
                buttonText: 'Aceptar'
            });
        }
    }
    const renderForm = () => {


        const disabledStyles = message ? {} : { opacity: 0.5 }
        const buttonIconStyles = [
            styles.formSendIcon,
            disabledStyles
        ]

        return (

            <Form style={styles.form}>
                <Item
                    rounded
                    style={styles.formItem}>
                    <Input
                        // autoFocus={false}
                        maxLength={100}
                        returnKeyType='send'
                        onChangeText={(message) => setMessage(message)}
                        onSubmitEditing={sendMessage}
                        style={styles.formInputText}
                        ref={inputRef}
                    ></Input>
                    <Button
                        disabled={!message}
                        icon
                        transparent
                        style={styles.formSend}
                        onPress={sendMessage}>
                        <Icon type="Ionicons" name="ios-send" style={buttonIconStyles} />
                    </Button>
                </Item>

            </Form>

        )
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
    const close = () => {
        if (props.closeDrawer) {
            console.log("close chat drawer")
            props.closeDrawer()
            return
        }
    }
    // const styles = this.props.style
    const b = Layout.isAndroid ? 'position' : 'padding'

    return (

        <Container>
            <Wallpaper source={bgSrc} >
                <Content  
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                    >

                    <View style={styles.title}>
                        <Button icon transparent onPress={close}>
                            <Icon type="Ionicons" name="ios-arrow-back" style={styles.iconTitle} />
                        </Button>

                        <Ionicons name="chatbox" size={24} style={styles.iconTitle} />
                    </View>

                    <ScrollView
                        style={styles.messageContainer}
                        ref={scrollViewRef}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }}>
                        {renderMessages()}
                    </ScrollView>
                    {renderForm()}

                </Content>
            </Wallpaper>
        </Container>


    )
}
export default FullChat;