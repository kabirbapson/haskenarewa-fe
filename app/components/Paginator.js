import {StyleSheet, Animated, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../config/dpTopx';
import colors from '../../assets/colors/colors';

export default Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 10, 5],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
});
