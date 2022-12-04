import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS } from 'theme/colors';
import {
  TRANSLATE_X,
  SUN_AND_MOON_SIZE,
  ANIMATION_DURATION,
  SWITCH_CONTAINER_WIDTH,
  SWITCH_CONTAINER_HEIGHT,
  SWITCH_PADDING_HORIZONTAL,
} from 'utils/constants';

type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  const mode = useSharedValue(+value);

  const moonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(mode.value ? TRANSLATE_X : 0, {
          duration: ANIMATION_DURATION,
        }),
      },
    ],
  }));

  const sunAnimatedStyle = useAnimatedStyle(() => {
    const handleTiming = withTiming(mode.value ? 0 : SUN_AND_MOON_SIZE, {
      duration: ANIMATION_DURATION,
    });

    return {
      width: handleTiming,
      height: handleTiming,
    };
  });

  const onToggle = () => {
    mode.value = mode.value === 1 ? 0 : 1;
    onChange(!!mode.value);
  };

  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[styles.switchContainer]}>
        <Animated.View style={[styles.moon, moonAnimatedStyle]}>
          <Animated.View style={[styles.sun, sunAnimatedStyle]} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: COLORS.sky,
    width: SWITCH_CONTAINER_WIDTH,
    height: SWITCH_CONTAINER_HEIGHT,
    borderRadius: SWITCH_CONTAINER_WIDTH / 2,
    paddingHorizontal: SWITCH_PADDING_HORIZONTAL,
  },
  moon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: SUN_AND_MOON_SIZE,
    height: SUN_AND_MOON_SIZE,
    backgroundColor: COLORS.sunAndMoon,
    borderRadius: SUN_AND_MOON_SIZE / 2,
  },
  sun: {
    position: 'absolute',
    width: SUN_AND_MOON_SIZE,
    height: SUN_AND_MOON_SIZE,
    backgroundColor: COLORS.sky,
    borderRadius: SUN_AND_MOON_SIZE / 2,
    marginLeft: -(SUN_AND_MOON_SIZE - SUN_AND_MOON_SIZE / 1.5),
  },
});

export default Switch;
