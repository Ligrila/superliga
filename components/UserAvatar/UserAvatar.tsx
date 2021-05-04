import React from 'react'
import { View, Image, ImageSourcePropType } from 'react-native'
import styles from './UserAvatar.styles'

interface UserAvatarProps {
    avatar: string;
}

const UserAvatar = (props: UserAvatarProps) => {

    return (
        <View style={styles.avatarContainer}>
            <Image
                style={styles.avatar}
                source={{ uri: props.avatar }} />
        </View>
    )

}
export default UserAvatar;
