import React, { useState } from 'react';
import Switch from 'components/Switch';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ANIMATION_DURATION } from 'utils/constants';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [isChecked, setIsChecked] = useState(true);
  const mode = useSharedValue(true);
  const bgColor = useAnimatedStyle(() => ({
    backgroundColor: withTiming(mode.value ? 'white' : 'black', { duration: ANIMATION_DURATION }),
  }));

  const onChange = (val: boolean) => {
    setIsChecked(val);
    mode.value = val;
  };

  return (
    <Animated.View style={[styles.container, bgColor]}>
      <Switch value={isChecked} onChange={onChange} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
