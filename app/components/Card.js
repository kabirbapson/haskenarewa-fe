import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

function Card({image = undefined}) {
  return (
    <View style={styles.container}>
      <Image
        // source={require('../../assets/images/image_slider.png')}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(230),
    borderRadius: 20,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
});

export default Card;
