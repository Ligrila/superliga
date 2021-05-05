import React, { Component } from "react";
import {
    Image
} from "react-native";
import Layout from '../../constants/Layout';


const TeamAvatar = ({ source, width, height }) => {

    const ratio = Layout.window.ratio;
    return (
        <Image source={{ uri: source }} style={{ width: width * ratio, height: height * ratio }} />
    )

}

export default TeamAvatar;