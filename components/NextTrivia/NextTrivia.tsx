import React from 'react'
import { View } from 'react-native'
import CountDown from '../CountDown';
import BigTitle from '../Title/BigTitle';
import Notice from '../Notice';
import Trivia from '../Trivia/Trivia';

import styles from './NextTrivia.styles'



const NextTrivia = ({ trivia, onFinishCountDown }) => {


    // const getNotice = () => {
    //     if (trivia.points_multiplier > 1) {
    //         if (trivia.points_multiplier == 2) {
    //             return <Notice text={'x cada acierto \n tus puntos se duplican!'} />
    //         } else {
    //             return <Notice text={'x cada acierto \n tus puntos valen ' + trivia.points_multiplier + ' veces más!'} />
    //         }
    //     }

    //     return null;
    // }


    if (!trivia) {
        return (
            <View style={styles.content}>
                <BigTitle
                    text='Trivia en'
                    red='Vivo'
                    subtitle={'No hay próximas trivias. Prueba de nuevo más tarde'}
                    hideSeparator={true}
                    titleBold={true}
                />
            </View>
        )
    }

    let sdate = trivia.start_datetime_local.toDate();
    let until = (sdate.getTime() - new Date().getTime()) / 1000;
    let subtitle:any = undefined;
    if(trivia.type === 'normal'){
        subtitle = trivia.local_team.name + ' VS ' + trivia.visit_team.name;
    }
    return (
        <View style={styles.content}>
            <BigTitle
                hideSeparator={true}
                text='Trivia en'
                red='Vivo'
                titleBold={true}
                subtitle={subtitle} />
            {/* Count Down */}
            <CountDown until={until} onFinish={onFinishCountDown} />
            {/* Trivia */}
            <View style={styles.triviaContainer}>
                <Trivia trivia={trivia} avatarWidth={250} avatarHeight={260} />
            </View>
        </View>
    );
}

export default NextTrivia;