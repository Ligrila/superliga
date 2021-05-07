import React, { useEffect, useState } from 'react';
import { Container, Content } from 'native-base'
import Wallpaper from '../../components/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Calendar from '../../components/Calendar/Calendar';
import BigTitle from '../../components/Title/BigTitle';

// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { calendarSelector, calendarAtom } from '../../recoil/Calendar.recoil';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
    useEffect(() => {
        updateCalendar()
    }, [])
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader />
                <Content
                    contentContainerStyle={{ paddingTop: 0, flex: 1 }}
                    padder
                    refreshControl={
                        <RefreshControl
                            style={{ backgroundColor: '#transparent' }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#fff" // Ios
                            colors={['#282828', '#fff']} //android
                            title={''}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <BigTitle text={`FIXTURE\nSUPERLIGA`} />
                    <ScrollView>
                        {calendar &&
                            <Calendar calendar={calendar.data} />}
                    </ScrollView>
                </Content>
            </Wallpaper>
        </Container>
    );

}
export default CalendarScreen;
