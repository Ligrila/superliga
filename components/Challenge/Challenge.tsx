import React  from 'react';
import { View } from 'react-native';

import ChallengeList from './ChallengeList';

const Challenges = () => {


  return (
    <View style={{ flex: 1 }} >
      <ChallengeList />
    </View>
  );
}


export default Challenges;
// connectStyle('SuperLiga.Championship')(Challenges);