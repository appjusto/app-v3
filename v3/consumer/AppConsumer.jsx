import React from 'react';
import { View } from 'react-native';
import { screens } from '../common/styles';
import { HomeHeader } from './home/header/HomeHeader';

export const AppConsumer = () => {
  return (
    <View style={{ ...screens.default }}>
      <HomeHeader />
    </View>
  );
};
