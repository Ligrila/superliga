import React from 'react';

import { Container, Content } from 'native-base'
import Wallpaper from '../../components/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Calendar from '../../components/Calendar/Calendar';
import { View } from 'react-native';
// Recoil
import { useRecoilValue } from 'recoil';
import { calendarSelector } from '../../recoil/selectors/Calendar.selector';
// Bg
const bgSrc = require('../../assets/images/home_bg.png');


const CalendarScreen = () => {
    const calendar = useRecoilValue(calendarSelector)
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader />
                <Calendar calendar={calendar.data} />
            </Wallpaper>
        </Container>
    );

}
export default CalendarScreen;
