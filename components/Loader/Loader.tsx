import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
interface LoaderProps {
    loading: boolean
}
const Loader = (props: LoaderProps) => {
    const { loading } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            onRequestClose={() => {

            }}
            visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading} />
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        zIndex: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default Loader;