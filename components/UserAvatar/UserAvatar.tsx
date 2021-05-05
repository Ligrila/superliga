import React from 'react'
import { View, Image, ImageSourcePropType } from 'react-native'
import styles from './UserAvatar.styles'

interface UserAvatarProps {
    avatar: string;
    borderColor?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
    const { borderColor, avatar } = props;
    return (
        <View style={[styles.avatarContainer, borderColor ? { borderColor: borderColor } : null]}>
            <Image
                style={styles.avatar}
                source={{ uri: avatar }} />
        </View>
    )

}
export default UserAvatar;
