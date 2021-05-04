import React, { FunctionComponent, useEffect } from 'react';
import {
  StyleSheet, View, Text, AsyncStorage,
} from 'react-native';

// Logout Screen
const LogoutScreen: React.FC = () => {
  const loggedOut = async () => {
    await AsyncStorage.removeItem('token');
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    async function fnLoggedOut() {
      await loggedOut();
      navigation.navigate('Login');
    }
    // Execute the created function directly
    fnLoggedOut();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Loading Auth</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default LogoutScreen;
