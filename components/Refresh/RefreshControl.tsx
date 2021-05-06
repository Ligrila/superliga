import React from 'react'
import {  RefreshControl  as RefreshControlNative} from 'react-native';

interface RefreshControlProps{
    refreshing: boolean,
    onRefresh?: () => void
    title?: string

}

const RefreshControl = (props: RefreshControlProps) => {
    const { refreshing, onRefresh, title} = props;
    return (
        <RefreshControlNative
            style={{ backgroundColor: 'transparent' }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            title={ title ? title : ''}
        />
    )
}

export default RefreshControl;