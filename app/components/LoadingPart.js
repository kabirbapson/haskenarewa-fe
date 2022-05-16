import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import {hp} from '../config/dpTopx';

export default function LoadingPart({title = 'Loading...'}) {
  return (
    <View style={styles.container}>
      <View style={styles.LoadingWrapper}>
        <ActivityIndicator size={'large'} color={colors.secondary} />
        <Text style={styles.loadingTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.70)',
  },
  LoadingWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: hp(20),
  },
  loadingTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
  },
});
