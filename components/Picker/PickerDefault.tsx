import React, { useCallback, useEffect, useState } from 'react';
import { Body, Button, Header, Icon, Item, Left, Picker, Right, Text, Title } from 'native-base';

import styles from './PickerDefault.styles'
import { Platform } from 'react-native';

export interface PickerDefaultItemProps {
    id: string,
    value: string,
    label: string,
}

interface PickerDefaultProps {
    headerTitle: string,
    placeholderText: string,
    value: any,
    items: Array<PickerDefaultItemProps>,
    onChangeValue: (value) => void
}

const PickerDefault = ({
    headerTitle,
    placeholderText,
    value,
    items,
    onChangeValue
}: PickerDefaultProps) => {
    const [title] = useState(headerTitle ? headerTitle : '');
    const [placeholder] = useState(placeholderText ? placeholderText : '');
    const [currentValue, setCurrenValue] = useState<any>(undefined);
    const onValueChange = (argValue) => {
        setCurrenValue(argValue)
        onChangeValue(argValue)
    }
    const fetchValue = useCallback(() => {
        setCurrenValue(value);
    }, [value, setCurrenValue])

    const renderItems = () => {
        if (!items || items.length === 0) {
            return null;
        }
        return items.map((item) => {
            const activeColor = item.id === currentValue ? '#353535' : '#8A8787'
            return (
                <Picker.Item
                    color={activeColor}
                    key={item.id}
                    value={item.value}
                    label={Platform.OS === 'ios' ? <Text style={{ color: activeColor }}>{item.label}</Text> : item.label}
                />)
        })
    }

    useEffect(() => {
        if (value != currentValue) {
            fetchValue()
        }
    }, [value, fetchValue])
    return (
        <Item  style={styles.pickerItem}>
               {items && items.length > 0 && 
                <Picker
                // note
                renderHeader={backAction =>
                    <Header style={styles.pickerHeader}>
                        <Left>
                            <Button transparent onPress={backAction}>
                                <Icon
                                    style={styles.pickerBackIcon}
                                    name="arrow-back" />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3 }}>
                            <Title style={styles.pickerHeaderTitle}>{title}</Title>
                        </Body>
                        <Right />
                    </Header>}
                style={styles.picker}
                placeholderStyle={styles.pickerPlaceholder}
                mode="dropdown"
                placeholder={placeholder}
                iosIcon={<Icon type="AntDesign" style={styles.pickerIcon} name="caretdown" />}
                textStyle={styles.pickerText}
                itemTextStyle={styles.pickerItemText}
                selectedValue={currentValue}
                placeholderIconColor="#000"
                onValueChange={onValueChange}>
                {renderItems()}
            </Picker>}
        </Item>
    )

}

export default PickerDefault;