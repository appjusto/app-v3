/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Text, View } from 'react-native';
import { texts } from '../../common/styles/fonts';

interface Props {
  focused: boolean;
  color: string;
  size: number;
}

export const TabBarIcon =
  (title: string, icon: string) =>
  ({ focused }: Props) =>
    (
      <View
        style={{
          // alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{icon}</Text>
        <Text style={[{ ...texts.ss }, focused ? { ...texts.bold } : { ...texts.base }]}>
          {title}
        </Text>
      </View>
    );
