import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { screens } from './styles';
import { colors } from './styles/colors';

export interface Props {
  children: () => React.ReactNode;
  loadAssets: () => Promise<void>;
}

export const PreloadAssets = ({ children, loadAssets }: Props) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  React.useEffect(() => {
    void (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAssets();
        setAssetsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [loadAssets]);

  const onLayoutRootView = () => {
    void (async () => {
      if (assetsLoaded) {
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          console.warn(error);
        }
      }
    })();
  };

  if (!assetsLoaded) return null;

  return (
    <View style={screens.default} onLayout={onLayoutRootView}>
      {assetsLoaded ? children() : <ActivityIndicator size="small" color={colors.white} />}
    </View>
  );
};
