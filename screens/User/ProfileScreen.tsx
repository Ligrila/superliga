import React, { useCallback, useEffect, useState } from 'react';
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
import * as MediaLibrary from 'expo-media-library';
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
import { useRecoilState } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
// Styles
import styles from './ProfileScreen.styles'
import AuthHelper from '../../helpers/Auth/Auth.helper';
const bgBlueSrc = require('../../assets/images/bg-blue.png');
const bgSrc = require('../../assets/images/home_bg.png');

const ProfileScreen = (props) => {
    // State
    const [image, setImage] = useState<any>(null);
    const [lives, setLives] = useState('0');
    const [points, setPoints] = useState('0');
    const [playedGames, setPlayedGames] = useState('0');
    // Api
    const api = new Api;
    // Helper
    const authHelper = new AuthHelper();
    // Nav
    const navigation = useNavigation();
    // Recoil
    const [authUser, setAuthUser] = useRecoilState(authUserAtom);


    const closeSession = () => {
        // navigation.navigate('Logout')
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

    const _checkPermissionsCamera = async () => {
        const response = await ImagePicker.requestCameraPermissionsAsync();
        let accept = false;
        if (response.status.includes('granted')) {
            accept = true;
        }
        return true;
    }

    const _checkPermissionLibrary = async () => {
        const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let accept = false;
        if (response.status.includes('granted')) {
            accept = true;
        }
        return true;
    }

    const _takePhoto = async () => {

        const accept = await _checkPermissionsCamera();
        if (!accept) {
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });


        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            setImage(result.uri)
            const response = await api.changeAvatar(result.uri);
            if (response.success) {
                const response = await api.getUserInformation();
                // Fetch User Info
                const userInfoResp = authHelper.formatAuthUser(response);
                setAuthUser(userInfoResp);

                Toast.show({
                    text: 'Se actualizo correctamente tu imagen de perfil',
                    type: 'success',
                    buttonText: 'Aceptar'
                });
            } else {
                Toast.show({
                    text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
                    buttonText: 'Aceptar'
                });
            }
        }
    }
    const _pickImage = async () => {
        const accept = await _checkPermissionLibrary();
        if (!accept) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });


        if (!result.cancelled) {
            setImage(result.uri)
            const response = await api.changeAvatar(result.uri);
            console.log('response', response)
            if (response.success) {
                const response = await api.getUserInformation();
                // Fetch User Info
                const userInfoResp = authHelper.formatAuthUser(response);
                setAuthUser(userInfoResp);

                Toast.show({
                    text: 'Se actualizo correctamente tu imagen de perfil',
                    type: 'success',
                    buttonText: 'Aceptar'
                });
            } else {
                Toast.show({
                    text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
                    buttonText: 'Aceptar'
                });
            }
        }
    }
    if (!authUser) {
        return <View />;
    }

    const fetchData = useCallback(() => {
        setImage(authUser.avatar)

        if (authUser.life) {
            setLives(`${authUser.life.lives}`);
        }
        if (authUser.infinite_lives && authUser.infinite_lives[0]) {
            setLives('∞');
        }
        if (authUser.point) {
            setPoints(`${authUser.point.points}`);
        }
        if (authUser.played_game) {
            setPlayedGames(`${authUser.played_game.count}`);
        }

    }, [authUser]);

    useEffect(() => {
        if (authUser) {
            fetchData();
        }
    }, [authUser, fetchData])


    return (
        <Container >
            <Wallpaper source={bgSrc} >
                <AppHeader />

                <View style={styles.bigTitle}>
                    <BigTitle text="MI PERFIL"></BigTitle>
                </View>
                <Wallpaper source={bgBlueSrc} styles={styles.profileWallpaper}>
                    {authUser &&
                        <Content style={styles.profileContent} >
                            <View style={styles.profileContainer}>
                                {image &&
                                    <UserAvatar avatar={image} borderColor="#fff" />}
                                <View style={styles.userTitleContainer}>
                                    <Text style={styles.userTitle}>{(authUser.first_name + " " + authUser.last_name).toUpperCase()}</Text>
                                    <Text style={styles.text}>{authUser.email}</Text>
                                </View>
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
                        </Content>}
                </Wallpaper>

            </Wallpaper>
        </Container >
    );
}


export default ProfileScreen;
