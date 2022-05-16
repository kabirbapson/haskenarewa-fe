import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {hp, wp} from '../config/dpTopx';
import colors from '../../assets/colors/colors';

export default function BottomInputAlert({
  children,
  visibility = false,
  onBlankPress = () => {},
  overlayOpacity = 0.8,
}) {
  const translation = useRef(new Animated.Value(200)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visibility) {
      setVisible(visibility);
      openAnimation();
    } else {
      closeAnimation();
    }
  }, [visibility]);

  const closeAnimation = () => {
    Animated.timing(translation, {
      toValue: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(visibility);
    });
  };

  const openAnimation = () => {
    Animated.timing(translation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {visible && (
        <View
          style={[
            styles.container,
            {backgroundColor: `rgba(0,0,0, ${overlayOpacity})`},
          ]}>
          <Pressable
            style={{flex: 1}}
            onPress={() => onBlankPress(!visibility)}
          />
          <Animated.View
            style={[
              styles.bottomModel,
              {transform: [{translateY: translation}]},
            ]}>
            <View style={styles.topLineIndicator} />
            {children}
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  bottomModel: {
    width: '100%',
    height: hp(200),
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopRightRadius: hp(25),
    borderTopLeftRadius: hp(25),
  },
  topLineIndicator: {
    width: wp(50),
    height: hp(5),
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: colors.grey,
  },
});
