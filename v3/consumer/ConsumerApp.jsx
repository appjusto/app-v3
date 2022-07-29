import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { screens } from '../common/styles';
import { HomeHeader } from './home/header/HomeHeader';
import { LocationBar } from './home/header/location-bar/LocationBar';

export const ConsumerApp = () => {
  return (
    <View style={{...screens.default}}>
      <HomeHeader />
      
    </View>
  );
}
