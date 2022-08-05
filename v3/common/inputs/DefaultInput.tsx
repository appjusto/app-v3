import { isEmpty } from 'lodash';
import React from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { borders } from '../styles/borders';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding1, padding3 } from '../styles/padding';

export interface DefaultInputProps extends TextInputProps {
  title?: string;
  children?: React.ReactNode;
  errorMessage?: string;
}

export default React.forwardRef(function DefaultInput(
  { title, children, editable = true, style, errorMessage, ...props }: DefaultInputProps,
  externalRef
) {
  // refs
  const internalRef = React.useRef<TextInput>(null);
  const ref = (externalRef as React.RefObject<TextInput>) || internalRef;
  // callbacks
  const focus = React.useCallback(() => {
    if (!ref.current) return null;
    ref.current.focus();
  }, [ref]);
  // UI
  return (
    <View style={style}>
      <View
        style={[
          {
            padding: padding3,
            ...borders.default,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            alignContent: 'center',
            borderColor: isEmpty(errorMessage) ? borders.default.borderColor : colors.red,
          },
        ]}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {!isEmpty(title) ? (
              <Pressable onPress={focus}>
                {() => (
                  <Text
                    style={{
                      ...texts.xs,
                      color: editable ? colors.green600 : colors.grey700,
                      width: '100%',
                    }}
                  >
                    {title}
                  </Text>
                )}
              </Pressable>
            ) : null}
            <View>
              <View>
                <TextInput
                  ref={ref}
                  style={{
                    ...texts.md,
                    color: editable ? colors.grey700 : colors.grey500,
                    width: '100%',
                    marginTop: padding1,
                  }}
                  placeholderTextColor={colors.grey700}
                  editable={editable}
                  {...props}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignSelf: 'center' }}>{children}</View>
      </View>
      {!isEmpty(errorMessage) ? (
        <Text style={{ ...texts.xs, color: colors.red }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
});
