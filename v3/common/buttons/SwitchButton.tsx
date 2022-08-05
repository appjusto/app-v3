import { Canvas, RoundedRect, SkiaView, useSpring } from '@shopify/react-native-skia';
import React from 'react';
import { LayoutRectangle, Pressable, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding1, padding2, padding6 } from '../styles/padding';

export type SwitchPosition = 'left' | 'right';

interface Props {
  leftIcon: string;
  leftText: string;
  rightIcon: string;
  rightText: string;
  position: SwitchPosition;
  onToggle: (value: SwitchPosition) => void;
}

export const SwitchButton = ({
  leftIcon,
  leftText,
  rightIcon,
  rightText,
  position,
  onToggle,
}: Props) => {
  // state
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  // UI
  const padding = padding1;
  const thumbX = useSpring(
    position === 'left' ? padding : layout?.width ? layout.width * 0.5 + padding : 0
  );
  return (
    <View style={{ height: 54 }} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
      {layout ? (
        <Pressable
          onPress={() => {
            onToggle(position === 'left' ? 'right' : 'left');
          }}
        >
          {() => (
            <View style={{ flex: 1 }}>
              <SkiaView style={{ flex: 1 }}>
                <Canvas style={{ width: layout.width, height: 54, position: 'absolute' }}>
                  <RoundedRect
                    x={0}
                    y={0}
                    width={layout.width}
                    height={54}
                    r={64}
                    color={colors.green700}
                  />
                </Canvas>

                <Canvas
                  style={{
                    width: layout.width,
                    height: 54,
                    position: 'absolute',
                  }}
                >
                  <RoundedRect
                    x={thumbX}
                    y={padding}
                    width={(layout.width - padding * 4) / 2}
                    height={54 - padding * 2}
                    r={64}
                    color={colors.green100}
                  />
                </Canvas>
              </SkiaView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  height: layout.height,
                  width: layout.width,
                  paddingHorizontal: padding6,
                }}
                focusable={false}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text>{leftIcon}</Text>
                  <Text
                    style={{
                      ...texts.md,
                      marginLeft: padding2,
                      color: position === 'left' ? colors.black : colors.white,
                    }}
                  >
                    {leftText}
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text>{rightIcon}</Text>
                  <Text
                    style={{
                      ...texts.md,
                      marginLeft: padding2,
                      color: position === 'right' ? colors.black : colors.white,
                    }}
                  >
                    {rightText}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Pressable>
      ) : null}
    </View>
  );
};
