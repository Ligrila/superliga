import React, { FunctionComponent, useContext, useState, useEffect, useCallback } from 'react'
// Gesture
import { TouchableOpacity } from 'react-native-gesture-handler';
// Style
// Native Base
import {
    Button,
    Text,
    Form,
    Item,
    Input,
    Label,
    View,
    H1,
    Grid,
    Row,
    Col,
    Icon
} from 'native-base';
// Toast
import Toast from 'react-native-root-toast';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Auth Context
import AuthContext from '../../utilities/Auth/AuthContext';
import Logo from '../../components/Logo/Logo';
// React form
import { useForm } from 'react-hook-form';
// Styles
import authStyles from './AuthScreens.styles'
import globalStyles from '../../styles/Global.styles'
import { Variables } from '../../styles';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/user';

const LoginScreen: FunctionComponent = () => {
    // Loading
    const [loading, setLoading] = useState(false);
    // Show Hide Password
    const [showPassword, setShowPassword] = useState(true);
    // Navigation
    const navigation = useNavigation();
    // Auth Context
    const { signIn } = useContext(AuthContext);
    // Validation
    const {
        register,
        errors,
        setValue,
        trigger,
        getValues
    } = useForm({
        mode: 'onChange'
    });

    const [loginMutation] = useMutation(LOGIN);
    // Login
    const login = async () => {
        setLoading(true);
        const loginData = getValues();
        try{
        const result = await loginMutation({variables:loginData})
        if(result.data.login){
            await signIn(result.data.login);
            setLoading(false);
            // navigation.navigate('Root')
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }
        console.log({result})
        } catch(e){
            setLoading(false);
            Toast.show('Usuarios o contraseñas incorrectas', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: Variables.brandDanger
            });
        }
        
        

        //await signIn('Token set');
        /*setTimeout(() => {
            setLoading(false);
            // navigation.navigate('Root')
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }, 600)*/



    }
    //#region Events

    // On press Restore Password
    const onPressRestorePassword = () => {
        navigation.navigate('Forgot');
    }
    // On press Password
    const onPressShowPassowrd = () => {
        setShowPassword(!showPassword);
    }
    // On press Login
    const onPressLogin = async () => {
        await trigger();
        if (Object.keys(errors).length === 0) {
            login();
        } else {
            Toast.show('Debe Completar los campos requeridos', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: Variables.brandDanger
            });
        }

    }
    const onChangeInput = (event, key) => {
        if (event.nativeEvent) {
            const { text } = event.nativeEvent;
            setValue(key, text)
        }
    }
    //#endregion Events

    // Validation
    const validation = useCallback(() => {
        register({ name: 'email' },
            {
                required: 'El email es requerido',
                validate: value =>
                    value.includes('@') || "El correo debe incluir el símbolo '@' ",
            });
        register({ name: 'password' },
            { required: 'La contraseña es requerida' });
    }, [register])
    // On mount
    useEffect(() => {
        validation();
    }, [validation])

    return (
        <Grid style={authStyles.grid}>
            <Row size={40} style={authStyles.header}>
                <Col size={12} style={authStyles.headerContainer}>
                    <Logo />
                    <H1 style={authStyles.headerTitle}>STINE SEMILLAS</H1>
                    <Text style={authStyles.headerSubTitle}>Login</Text>
                </Col>
            </Row>
            <Row size={60}>
                <Col size={12}>
                    <Form style={authStyles.form}>
                        {/* Email */}
                        <Item floatingLabel error={errors.email ? true : false}>
                            <Label style={ globalStyles.label}>
                                Correo Electrónico
                            </Label>
                            <Input
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                autoCompleteType={'email'}
                                onChange={(event) => onChangeInput(event, 'email')} />
                            <Icon name='user' type="AntDesign" />
                        </Item>
                        {/* Error */}
                        {errors.email && <Text style={globalStyles.textError}>{errors.email.message}</Text>}
                        {/* Password */}
                        <Item floatingLabel error={errors.password ? true : false}>
                            <Label style={ globalStyles.label}>
                                Contraseña
                                </Label>
                            <Input secureTextEntry={showPassword} onChange={(event) => onChangeInput(event, 'password')} />
                            <Icon name={showPassword ? 'lock' : 'unlock'} type="AntDesign" onPress={onPressShowPassowrd} />
                        </Item>
                        {/* Error */}
                        {errors?.password && <Text style={globalStyles.textError} >{errors.password.message}</Text>}
                        <View style={authStyles.forgot}>
                            <TouchableOpacity onPress={onPressRestorePassword}>
                                <Text>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={authStyles.formBtnContainer}>
                            <Button full rounded onPress={onPressLogin} disabled={loading}>
                                <Text > {loading ? 'Cargando...' : 'Ingresar'}</Text>
                            </Button>
                        </View>
                    </Form>
                </Col>
            </Row>
        </Grid>
    )
}




export default LoginScreen