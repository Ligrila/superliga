import { Text } from 'native-base';
import React from 'react';
import globalStyles from '../../styles/Global.styles'

const ErrorHelp = ({ message }) =>{
    return(
        <Text style={globalStyles.textError}>{message}</Text>
    )
}

export default ErrorHelp;

