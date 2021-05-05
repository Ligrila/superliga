import React, { useState } from 'react';
import {
    View
} from 'react-native';
// Native base
import {
    Container,
    Content,
    Button,
    Form,
    Item,
    Input,
    Text,
    Toast
} from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import Loader from '../../components/Loader/Loader';
// Api
import Api from '../../api/Api';
// Hooks Forms
import { useForm, Controller } from "react-hook-form";
// Navigation
import { useNavigation } from '@react-navigation/native';
// Style
import styles from './LoginScreen.styles';
import globalStyles from '../../styles/Global.styles'
const bgSrc = require('../../assets/images/login/bg.png');


const RegisterScreen = () => {
    // Api
    const api = new Api();
    // States 
    const navigation = useNavigation();
    // Loading
    const [loading, setLoading] = useState(false);
    // Form
    const { getValues, formState: { errors }, trigger, control } = useForm({
       
    });
    // Go to login
    const _onLoginButton = () => {
        navigation.navigate('Login');
    }
    const _onSubmit = async () => {
        await trigger();
        if (Object.keys(errors).length === 0) {
            try {
                setLoading(true);
                let { first_name, last_name, email, password, referral_username, mobile_number } = getValues();
                var user = await api.register(first_name, last_name, email, password, referral_username, null, mobile_number).catch(e => {
                    console.log(e);
                });
                console.log(user);
                if (user && user.success) {
                    Toast.show({
                        text: 'Te hemos enviado un email para confirmar tu correo. Una vez confirmado, usa tus datos proporcionados anteriormente para ingresar',
                        type: 'success',
                        buttonText: 'Aceptar'
                    });
                    navigation.navigate('Login');
                } else {
                    if (user.data && user.data.user && user.data.user.document) {
                        Toast.show({
                            text: 'Documento ya registrado o inválido',
                            position: "top",
                            type: 'danger',
                            buttonText: 'Aceptar'
                        });
                        return
                    }
                    Toast.show({
                        text: 'Datos inválidos o email ya registrado',
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

    };


    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <Loader loading={loading} />
                <Content padder contentContainerStyle={styles.register}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Crear cuenta nueva</Text>
                        <Form>
                            {/* First Name */}
                            <View style={styles.itemContainer}>
                                <Item style={styles.item} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input
                                                style={styles.input}
                                                onChangeText={onChange}
                                                placeholder="Nombre *"
                                            />
                                        )}
                                        name="first_name"
                                        rules={{ required: 'El nombre es requerido' }}
                                        defaultValue="" />
                                </Item>
                                {errors && errors.first_name && <Text style={globalStyles.textError}>{errors.first_name.message}</Text>}
                            </View>
                            {/* Last Name */}
                            <View style={styles.itemContainer}>
                                <Item style={styles.item}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input style={styles.input}
                                                placeholder="Apellido *"
                                                onChangeText={onChange}
                                            />
                                        )}
                                        name="last_name"
                                        rules={{ required: 'El apellido es requerido' }}
                                        defaultValue="" />
                                </Item>
                                {errors && errors.last_name && <Text style={globalStyles.textError}>{errors.last_name.message}</Text>}
                            </View>
                            {/* <Item style={[styles.item, { display: "none" }]}>
                                <Input style={styles.input}
                                    placeholder="Documento de identidad *"
                                    keyboardType='number-pad'
                                    {...register("document", { required: 'El documento es requerido' })}
                                />
                            </Item> */}
                            <View style={styles.itemContainer}>
                                <Item style={styles.item}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input style={styles.input}
                                                placeholder="Número de teléfono"
                                                keyboardType='phone-pad'
                                                onChangeText={onChange}
                                            />
                                        )}
                                        name="mobile_number"
                                        // rules={{ required: 'El teléfono es requerido' }}
                                        defaultValue="" />
                                </Item>
                                {errors && errors.mobile_number && <Text style={globalStyles.textError}>{errors.mobile_number.message}</Text>}
                            </View>
                            <View style={styles.itemContainer}>
                                <Item style={styles.item}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input style={styles.input}
                                                placeholder="Email *"
                                                keyboardType='email-address'
                                                autoCapitalize="none"
                                                onChangeText={onChange}
                                            />
                                        )}
                                        name="email"
                                        rules={{
                                            required: 'El email es requerido',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Email inválido"
                                            }
                                        }}
                                        defaultValue="" />
                                </Item>
                                {errors && errors.email && <Text style={globalStyles.textError}>{errors.email.message}</Text>}
                            </View>
                            <View style={styles.itemContainer}>
                                <Item style={styles.item}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input style={styles.input}
                                                placeholder="Password *"
                                                secureTextEntry={true}
                                                onChangeText={onChange}
                                            />
                                        )}
                                        name="password"
                                        rules={{
                                            required: 'El password es requerido'
                                        }}
                                        defaultValue="" />
                                </Item>
                                {errors && errors.password && <Text style={globalStyles.textError}>{errors.password.message}</Text>}
                            </View>
                            <View style={styles.itemContainer}>
                                <Item style={styles.item}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Input style={styles.input}
                                                placeholder="Código de referencia (Opcional)"
                                                onChangeText={onChange}
                                            />
                                        )}
                                        name="referral_username"
                                        defaultValue="" />
                                </Item>

                            </View>
                        </Form>
                        <Button rounded block large onPress={_onSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Registrarse</Text>
                        </Button>

                        <Text style={styles.registerTitle}>O ingresa si ya tienes cuenta :</Text>

                        <Button rounded block large info onPress={_onLoginButton} style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Ingresar</Text>
                        </Button>
                    </View>
                </Content>
            </Wallpaper>
        </Container>
    );
}



export default RegisterScreen;