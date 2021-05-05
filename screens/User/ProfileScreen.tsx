import React from 'react';
// Native
import { View, TouchableOpacity, Share } from 'react-native'
// React Native
import {
    Container,
    Content,
    Text,
    Toast,
    Button,
    ActionSheet
} from 'native-base';
// Permissions
import * as Permissions from 'expo-permissions';
// Components
import * as ImagePicker from 'expo-image-picker';
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import AppHeader from '../../components/AppHeader/AppHeader';
import BigTitle from '../../components/Title/BigTitle';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
// Api
import Api from '../../api/Api';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Recoil
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/atoms/Auth.atom';
// Styles
import styles from './ProfileScreen.styles'
const bgBlueSrc = require('../../assets/images/bg-blue.png');
const bgSrc = require('../../assets/images/home_bg.png');

const ProfileScreen = (props) => {
    // Api
    const api = new Api;
    // Nav
    const navigation = useNavigation();
    // Recoil
    const authUser = useRecoilValue(authUserAtom);

    const closeSession = () => {
        navigation.navigate('Auth', {
            screen: 'Logout'
        });
    }
    const edit = () => {
        navigation.navigate('EditProfile');
    }
    const share = () => {
        Share.share(
            {
                title: 'Jugada Super Liga',
                message: "Hola estoy jugando a Jugada Super Liga. Usa mi código '" + authUser.username + "' para registrate. https://www.jugadasuperliga.com/get"
            }
        );
    }
    const _actionSheet = () => {
        const BUTTONS = ["Seleccionar de galeria", "Tomar foto", "Cancelar"];

        const CANCEL_INDEX = 2
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Editar imagen de perfil"
            },
            buttonIndex => {
                if (buttonIndex == 0) {
                    _pickImage();
                }
                if (buttonIndex == 1) {
                    _takePhoto();
                }
            }
        )
    }

    const _checkPermissions = async () => {

        return await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL),
        ])
            .then(r => r.filter(o => o.status === 'granted'))
            .then(permissions => {
                if (permissions.length !== 2) {
                    return false;
                }
                return true;
            });
    }

    const _takePhoto = async () => {

        const c = await _checkPermissions();
        if (!c) {
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });


        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            // const response = await this.api.changeAvatar(result.uri);
            // if (response.success) {
            //     let user = authUser;
            //     user.avatar = result.uri;
            //     this.setState(user);
            //     UsersActions.update()
            // } else {
            //     Toast.show({
            //         text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
            //         buttonText: 'Aceptar'
            //     });
            // }
        }
    }
    const _pickImage = async () => {
        const c = await _checkPermissions();
        if (!c) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });


        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            // const response = await this.api.changeAvatar(result.uri);
            // if (response.success) {
            //     let user = authUser;
            //     user.avatar = result.uri;
            //     this.setState(user);
            //     UsersActions.update()
            // } else {
            //     Toast.show({
            //         text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
            //         buttonText: 'Aceptar'
            //     });
            // }
        }
    }
    if (!authUser) {
        return <View />;
    }

    let lives = '0';
    let points = 0;
    let playedGames = 0;
    if (authUser.life) {
        lives = authUser.life.lives;
    }
    if (authUser.infinite_lives && authUser.infinite_lives[0]) {
        lives = '∞';
    }
    if (authUser.point) {
        points = authUser.point.points;
    }
    if (authUser.played_game) {
        playedGames = authUser.played_game.count;
    }

    return (
        <Container >
            <Wallpaper source={bgSrc} >
                <AppHeader />
                <View style={{ flex: 1 }}>
                    <View style={styles.bigTitle}>
                        <BigTitle text="MI PERFIL"></BigTitle>
                    </View>
                    <Wallpaper source={bgBlueSrc} styles={styles.profileWallpaper}>
                        <Content style={styles.profileContent} >
                            <View style={styles.profileContainer}>
                                <UserAvatar avatar={authUser.avatar} borderColor="#fff" />
                                <Text style={styles.userTitle}>
                                    {(authUser.first_name + " " + authUser.last_name).toUpperCase()}
                                    <Text style={styles.text}>{"\n"}{authUser.email}</Text>
                                </Text>
                                {/* User Information */}
                                <View style={styles.textInformation}>
                                    <View style={styles.textInformationLine}>
                                        <Text style={styles.bold}>Puntos: </Text>
                                        <Text style={styles.text}>{points} puntos</Text>
                                    </View>
                                    <View style={styles.textInformationLine}>
                                        <Text style={styles.bold}>Vidas disponibles: </Text>
                                        <Text style={styles.text}>{lives}</Text>
                                    </View>
                                    <View style={styles.textInformationLine}>
                                        <Text style={styles.bold}>Partidos jugados: </Text>
                                        <Text style={styles.text}>{playedGames}</Text>
                                    </View>
                                </View>
                                {/* Change Profile Image */}
                                <TouchableOpacity onPress={_actionSheet} style={styles.changeAvatarButton}>
                                    <Text style={styles.changeAvatarButtonText}> editar imagen de perfil</Text>
                                </TouchableOpacity>

                                <View style={styles.buttonsContainer}>
                                    <Button transparent onPress={share}>
                                        <Text style={styles.changeAvatarButtonText}>Invitar</Text>
                                        <AntDesign name="sharealt" size={24} color="white" />
                                    </Button>
                                    <Button transparent onPress={edit}>
                                        <Text style={styles.changeAvatarButtonText}>Editar</Text>
                                        <AntDesign name="edit" size={24} color="white" />
                                    </Button>
                                    <Button transparent onPress={closeSession}>
                                        <Text style={styles.changeAvatarButtonText}>Salir</Text>
                                        <SimpleLineIcons name="logout" size={24} color="white" />
                                    </Button>
                                </View>
                            </View>
                        </Content>
                    </Wallpaper>
                </View>
            
            </Wallpaper>
        </Container>
    );
}


export default ProfileScreen;
