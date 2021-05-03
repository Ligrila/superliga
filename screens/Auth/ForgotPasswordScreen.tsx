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
    Icon,
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

const ForgotPasswordScreen: FunctionComponent = () => {
    // Loading
    const [loading, setLoading] = useState(false);
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
    // Login
    const restore = async () => {
        setLoading(true);
        const loginData = getValues();
        console.log('Login', loginData)
        await signIn('Token');
        setTimeout(() => {
            setLoading(false);
            // navigation.navigate('Root')
        }, 600)



    }
    //#region Events
    // On press Back
    const onPressBack = () => {
        navigation.navigate('Login');
    }
    // On press Login
    const onPressRestore = async () => {
        await trigger();
        if (Object.keys(errors).length === 0) {
            restore();
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
                    <Text style={authStyles.headerSubTitle}>Recuperar Contraseña</Text>
                </Col>
            </Row>
            <Row size={60}>
                <Col size={12}>
                    <Form style={authStyles.form}>
                        {/* Email */}
                        <Item floatingLabel error={errors.email ? true : false}>
                            <Label>Correo Electrónico</Label>
                            <Input
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                autoCompleteType={'email'}
                                onChange={(event) => onChangeInput(event, 'email')} />
                            <Icon name='user' type="AntDesign" />
                        </Item>
                        {/* Error */}
                        {errors.email && <Text style={globalStyles.textError}>{errors.email.message}</Text>}

                        <View style={authStyles.forgot}>
                            <TouchableOpacity onPress={onPressBack}>
                                <Text>Volver al Ingreso</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={authStyles.formBtnContainer}>
                            <Button rounded full onPress={onPressRestore} disabled={loading}>
                                <Text > {loading ? 'Cargando...' : 'Recuperar'}</Text>
                            </Button>
                        </View>
                    </Form>
                </Col>
            </Row>
        </Grid>
    )
}




export default ForgotPasswordScreen