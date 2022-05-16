import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import { hp, wp } from '../config/dpTopx';

export default function SearchBoxClick({ onSearchFocus = () => { } }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputWrapper}
        activeOpacity={0.8}
        onPress={onSearchFocus}>
        <View style={styles.searchIcon}>
          <Feather name="search" size={hp(20)} color={colors.black} />
        </View>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchInput}>{'Next I will read...'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: hp(54),
    paddingHorizontal: 25,
  },
  inputWrapper: {
    height: hp(54),
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    // backgroundColor: 'white',
  },
  searchInputWrapper: {
    // paddingTop: hp(10),
    // alignItems: 'center',
    width: '87%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: wp(15),
    // backgroundColor: 'red',
  },
  searchInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
  },
  searchIcon: {
    // backgroundColor: 'red',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: wp(30),
  },
});
