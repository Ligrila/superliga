import React, { useEffect, useState } from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import Api from '../../api/Api';
import Loader from '../Loader';
import { useNavigation } from '@react-navigation/native';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { livePacksAtom, livesPackSelector } from '../../recoil/LivePacks.recoil';
// Styles
import styles from './Purchase.styles';
const bgSrc = require('../../assets/images/purchase-modal.png');

const Purchase = ({ onHidePress }) => {
    // Api
    const api = new Api
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [livePacks, setLivePacks] = useRecoilState(livePacksAtom);
    // Update Live Packs
    const updateLivePacks = useRecoilCallback(({ snapshot }) => async () => {
        const responseLivePacks = await snapshot.getPromise(livesPackSelector);
        setLivePacks({ ...responseLivePacks });
    });
    // On Mount
    useEffect(() => {
        updateLivePacks();
    }, [])

    const _callPurchase = async (item) => {
        setLoading(true)
        const response = await api.purchase(item);
        console.log("purchase",response);
        if (!response || !response.success) {
            setLoading(false);
            return;
        }
        const purchaseUrl = response.data.purchaseUrl;
        setLoading(false)
        navigation.navigate('Purchase', { purchaseUrl });
    }
    const renderPacks = () => {
        if (livePacks.hasData) {
            const items = livePacks.data.map(
                (item) => {
                    return (
                        <View key={item.id} style={styles.item}>
                            <TouchableOpacity onPress={() => _callPurchase(item)}>
                                <Text style={styles.itemText}>COMPRAR {item.name.toUpperCase()}{item.infinite ? " " : "\n"}({item.price}$ ARS)</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            )
            return items;
        }
    }
    const onHide = () => {
        //console.log("ONHIDE");
        onHidePress();
    }
    const renderHide = () => {
        const hasHide = typeof (onHidePress) == 'function';

        if (!hasHide) {
            return null;
        }

        return (
            <View style={styles.close}>
                <TouchableOpacity
                    style={styles.closeTouchable}
                    onPress={onHide}
                >
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <ImageBackground source={bgSrc} 
                    style={{ ...styles.background, display: loading ? 'none' : 'flex' }}>
                {renderHide()}
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {'COMPRA VIDAS\n Y SEGUI\n JUGANDO'}
                    </Text>
                </View>
                {renderPacks()}
            </ImageBackground>

        </View>
    )

}
export default Purchase;
// export default connectStyle('SuperLiga.Purchase')(Purchase);