import React, { useCallback, useEffect } from 'react';
// Async Storage
import { useNavigation } from '@react-navigation/native';
import AuthUtility from '../../utilities/Auth/Auth.utility';
import { useSetRecoilState } from 'recoil';
import { authUserAtom, authUserLivesAtom } from '../../recoil/atoms/Auth.atom';



const LogoutScreen = () => {
  // Recoil
  const setAuthUser = useSetRecoilState(authUserAtom);
  const setAuthUserLives = useSetRecoilState(authUserLivesAtom);
  // Navigation
  const navigation = useNavigation();
  const resetData = useCallback(async () => {
    await AuthUtility.removeToken();
    setAuthUser({});
    setAuthUserLives(0);
    navigation.navigate('Login');
  }, [])
  useEffect(() => {
    resetData();
  }, [resetData])

  return null;

}
export default LogoutScreen;