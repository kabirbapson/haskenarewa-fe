import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Animated,
  PanResponder,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import Card from './Card';

import {GestureDetector} from 'react-native-gesture-handler';

function HeroCard() {
  const pan = useRef(new Animated.ValueXY()).current;
  const item = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

  const ref = useRef(null);
  const [index, setActiveIndex] = useState(1);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}}, // Back to zero
      ).start();
    },
  });

  return (
    <View style={styles.container}>
      {/* <DraggableView /> */}
      <Card />
      <View style={styles.scrollerWrapper}>
        {item.map(item => (
          <View
            style={[
              styles.scrollerItem,
              item.id === index && {backgroundColor: colors.primary},
            ]}
            key={item.id}></View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    width: '100%',
    // backgroundColor: 'red',
  },
  scrollerWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(28),
    height: hp(10),
    width: wp(132),
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  scrollerItem: {
    backgroundColor: colors.grey,
    width: wp(30),
    height: '100%',
    borderRadius: 10,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});

export default HeroCard;
