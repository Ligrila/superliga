import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Toast } from 'native-base'
import React, { Component, useCallback, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import Reflux from 'reflux'
import { authUserAtom } from '../../recoil/Auth.recoil'


const CheckDocument = () => {
    const authUser = useRecoilValue(authUserAtom);
    const navigation = useNavigation();
    const fnCheckDocument = useCallback(() => {
        if (!authUser.document) {
            Toast.show({
                text: 'Debido a un cambio en nuestros términos y condiciones debes suministrarnos tu documento para que podamos entregarte los premios',
                type: 'danger'
            })
            navigation.navigate('EditProfile');
        }

    }, [authUser])
    useFocusEffect(
    useCallback(() => {
        if (authUser && authUser.id) {
            fnCheckDocument()
        }
    }, [authUser]))

    return null

}

export default CheckDocument;