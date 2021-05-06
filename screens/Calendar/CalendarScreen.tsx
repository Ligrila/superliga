import React, { useEffect, useState } from 'react';
import { Container, Content } from 'native-base'
import Wallpaper from '../../components/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Calendar from '../../components/Calendar/Calendar';
import BigTitle from '../../components/Title/BigTitle';
import RefreshControl from '../../components/Refresh/RefreshControl';
// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { calendarSelector, calendarAtom } from '../../recoil/Calendar.recoil';

// Bg
const bgSrc = require('../../assets/images/home_bg.png');


const CalendarScreen = () => {
    // States
    const [refreshing, setRefreshing] = useState(true);
    // Recoil
    const [calendar, setCalendar] = useRecoilState(calendarAtom);
    // Update Calendar
    const updateCalendar = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const response = await snapshot.getPromise(calendarSelector);
        setCalendar(response);
        setRefreshing(false);
    }, [setCalendar, setRefreshing]);

    const onRefresh = () => {
        updateCalendar();
    }
    // Update Ever
    useEffect(() =>{
        updateCalendar()
    },[]) 
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader />
                <BigTitle text={`FIXTURE\nSUPERLIGA`} />
                <Content padder
                    refreshControl={
                        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                    }
                >
                    {calendar &&
                        <Calendar calendar={calendar.data} />}
                </Content>
            </Wallpaper>
        </Container>
    );

}
export default CalendarScreen;
