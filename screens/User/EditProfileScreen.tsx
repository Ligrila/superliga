import React, { useCallback, useEffect, useState } from 'react';
// React Native
import { KeyboardAvoidingView, View } from 'react-native';
// Native Base
import {
    Container,
    Content,
    Button,
    Form,
    Item,
    Text,
    Toast,
    Input,
    Spinner,
}
    from 'native-base';

import Wallpaper from '../../components/Wallpaper/Wallpaper';


import Api from '../../api/Api';
import AppHeader from '../../components/AppHeader/AppHeader';
import { useNavigation } from '@react-navigation/native';
// Styles
import styles from './EditProfileScreen.styles'
import Layout from '../../constants/Layout';
import BigTitle from '../../components/Title/BigTitle';
import ErrorHelp from '../../components/Error/ErrorHelp';
// Recoil
import { useRecoilState } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
// Form
import { Controller, useForm } from 'react-hook-form';
// Utilities
import AuthHelper from '../../helpers/Auth/Auth.helper';
import Loader from '../../components/Loader/Loader';


const bgBlueSrc = require('../../assets/images/bg-blue.png');
const bgSrc = require('../../assets/images/home_bg.png');

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const api = new Api;
    // Recoil
    const [authUser, setAuthUser] = useRecoilState(authUserAtom);
    // Loading
    const [loading, setLoading] = useState(false);
    // Form
    const { getValues, formState: { errors }, trigger, control, setValue } = useForm();
    // Helpers
    const authHelper = new AuthHelper();
    // Fetch Data
    const fetchData = useCallback(() => {
        console.log('authUser.document', authUser.document)
        setValue('first_name', authUser.first_name)
        setValue('last_name', authUser.last_name)
        setValue('document', `${authUser.document}`, { shouldValidate: true })
        setValue('mobile_number', authUser.mobile_number)
    }, [authUser])
    useEffect(() => {
        if (authUser) {
            fetchData();
        }
    }, [authUser, fetchData])
    // Go Back Thony
    const navigateBack = () => {
        navigation.goBack()
    }
    const _onSubmit = async () => {
        await trigger();
        if (Object.keys(errors).length === 0) {
            try {
                setLoading(true);
                console.log(getValues());
                let { first_name, last_name, document, mobile_number } = getValues();
                const userResponse = await api.editUser({ first_name, last_name, document, mobile_number });

                if (userResponse && userResponse.success) {

                    const response = await api.getUserInformation();

                    Toast.show({
                        text: 'Tu perfil se editó correctamente',
                        type: 'success',
                        buttonText: 'Aceptar'
                    });
                    const user = authHelper.formatAuthUser(response);
                    setAuthUser(user);
                    navigateBack();
                } else {
                    if (userResponse.data && userResponse.data.user && userResponse.data.user.document) {
                        Toast.show({
                            text: 'Documento ya registrado o inválido',
                            position: "top",
                            type: 'danger',
                            buttonText: 'Aceptar'
                        });
                        return
                    }
                    Toast.show({
                        text: 'No se pudo editar el usuario. Por favor, intenta nuevamente',
                        position: "top",
                        type: 'danger',
                        buttonText: 'Aceptar'
                    });
                }
            } catch (e) {
                console.log('e', e);
                Toast.show({
                    text: 'Oops..Ha ocurrido un error intentalo mas tarde.',
                    position: "top",
                    type: 'danger',
                    buttonText: 'Aceptar'
                });
            } finally {
                setLoading(false);
            }
        } else {
            Toast.show({
                text: 'Debe Completar los campos requeridos',
                position: "top",
                type: 'danger',
                buttonText: 'Aceptar'
            });
        }
    }


    return (
        <Container>
            <Loader loading={loading} />
            <Wallpaper source={bgSrc}>
                <AppHeader />
                <View style={{ flex: 1 }}>

                    <Wallpaper source={bgBlueSrc} styles={styles.profileWallpaper}>
                        <Content contentContainerStyle={styles.content}>
                            <View style={styles.bigTitle}>
                                <BigTitle 
                                hiddeSeparator={true}
                                text={'Editar Perfil'}></BigTitle>
                            </View>
                            <KeyboardAvoidingView style={styles.container} >
                                <Form style={styles.form}>
                                    {/* first_name */}
                                    <View style={styles.itemContainer}>
                                        <Item style={styles.item}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input style={styles.input}
                                                        placeholder="Nombre"
                                                        onChangeText={onChange}
                                                        placeholderTextColor='#fff'
                                                        value={value}
                                                    />
                                                )}

                                                name="first_name"
                                                rules={{ required: 'El nombre es requerido' }}
                                            />
                                        </Item>
                                        {/* Error */}
                                        {errors && errors.first_name && <ErrorHelp message={errors.first_name.message} />}
                                    </View>
                                    {/* last_name */}
                                    <View style={styles.itemContainer}>
                                        <Item style={styles.item}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input style={styles.input}
                                                        placeholder="Apellido"
                                                        onChangeText={onChange}
                                                        placeholderTextColor='#fff'
                                                        value={value}
                                                    />
                                                )}
                                                name="last_name"
                                                rules={{ required: 'El apellido es requerido' }}
                                            />
                                        </Item>
                                        {/* Error */}
                                        {errors && errors.last_name && <ErrorHelp message={errors.last_name.message} />}
                                    </View>
                                    {/* document */}
                                    <View style={styles.itemContainer}>
                                        <Item style={styles.item}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input style={styles.input}
                                                        placeholder="Documento de identidad"
                                                        onChangeText={onChange}
                                                        placeholderTextColor='#fff'
                                                        keyboardType='number-pad'
                                                        value={value}
                                                    />
                                                )}
                                                name="document"
                                                rules={{
                                                    required: 'El documento es requerido',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'El documento debe ser de al menos 8 digitos'
                                                    },
                                                    pattern: {
                                                        value: /[0-9]+/i,
                                                        message: 'Documento no inválido'
                                                    }
                                                }}
                                            />
                                        </Item>
                                        {errors && errors.document && <ErrorHelp message={errors.document.message} />}

                                    </View>
                                    {/* mobile_number  */}
                                    <View style={styles.itemContainer}>
                                        <Item style={styles.item}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input style={styles.input} placeholder="Teléfono"
                                                        placeholderTextColor='#fff'
                                                        keyboardType='phone-pad'
                                                        defaultValue={authUser.mobile_number}
                                                        onChangeText={onChange}
                                                        value={value}
                                                    />
                                                )}
                                                name="mobile_number"
                                                rules={{ required: 'El telefono es requerido' }}
                                            />
                                        </Item>
                                        {errors && errors.mobile_number && <ErrorHelp message={errors.mobile_number.message} />}
                                    </View>

                                </Form>

                                <Button rounded block large onPress={_onSubmit} style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </Button>

                                <Button rounded info block large onPress={navigateBack} style={styles.backButton}>
                                    <Text style={styles.backButtonText}>Volver</Text>
                                </Button>

                            </KeyboardAvoidingView>
                        </Content>
                    </Wallpaper>
                </View>
            </Wallpaper>
        </Container>
    );



}

export default EditProfileScreen;