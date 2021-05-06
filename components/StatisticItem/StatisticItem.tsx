import React, { useCallback, useEffect, useState } from "react";
// Native
import { View } from "react-native";
// Native Base
import { Text } from 'native-base';
// Constants
import Layout from '../../constants/Layout';
// Components
import GameBallCircularProgress from '../GameBallCircularProgress/src/GameBallCircularProgress'
// Styles
import styles from './StatisticItem.styles';

interface StatisticItemProps {
    tintColor?: string,
    text?: string,
    fillText?: string,
    fill?: number,
    duration?: number,
    onBallFill?: Function,
    onTimeout?: Function
}

const StatisticItem = (props: StatisticItemProps) => {
    const defaultTintColor = '#a97bcd';
    const fillDefault = 0;
    const durationDefault = 1000;
    const [tintColor, setTintColor] = useState(props.tintColor ? props.tintColor : defaultTintColor)
    const [fillText, setFillText] = useState(props.fillText ? props.fillText : '')
    const [text, setText] = useState(props.text ? props.text : '')
    const [fill, setFill] = useState(props.fill ? props.fill : fillDefault)
    const [duration, setDuration] = useState(props.duration ? props.duration : durationDefault)



    // Callbacks
    const onBallFill = () => {
        if (props.onBallFill) {
            props.onBallFill()
        }
    }
    const onTimeout = () => {
        if (props.onTimeout) {
            props.onTimeout()
        }
    }
    const fetchData = useCallback(() => {
        setTintColor(props.tintColor ? props.tintColor : defaultTintColor)
        setFillText(props.fillText ? props.fillText : '')
        setText(props.text ? props.text : '')
        setFill(props.fill ? props.fill : fillDefault)
        setDuration(props.duration ? props.duration : durationDefault)
    }, [props]);
    useEffect(() => {
        if (props) {
            fetchData()
        }
    }, [fetchData, props])
    return (
        <View style={styles.container}>
            <GameBallCircularProgress
                // ref={(ref) => this.circularProgress = ref}
                size={175 * Layout.window.ratio}
                width={20 * Layout.window.ratio}
                duration={duration}
                fill={fill}
                backgroundColor="rgba(255,255,255,0.42)"
                tintColor={tintColor}
                animationListener={onBallFill}
                onAnimationComplete={onTimeout}
            >
                {
                    (fill) => (
                        <View style={styles.fill}>
                            <Text style={styles.fillText}>
                                {fillText}
                            </Text>
                        </View>
                    )
                }
            </GameBallCircularProgress>
            <Text style={styles.text}>{text.toUpperCase()}</Text>
        </View>
    )

}

export default StatisticItem;

