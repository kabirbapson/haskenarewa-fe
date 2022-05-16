import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import {hp} from '../config/dpTopx';

export default function Loading({title}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size={'large'} />
      <Text style={styles.loadingTitle}>{title}</Text>

      {/* <ActivityIndicator /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    // marginTop: hp(100),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    textAlign: 'center',
    color: colors.black,
  },
});
