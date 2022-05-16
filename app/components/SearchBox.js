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

function SearchBox({ onSearchFocus = () => { } }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={hp(20)} color={colors.black} />
        </TouchableOpacity>
        <TextInput
          placeholder="Next I will read..."
          style={styles.searchInput}
          onFocus={onSearchFocus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: hp(54),
    paddingHorizontal: wp(4),
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
  searchInput: {
    paddingTop: hp(10),
    paddingHorizontal: wp(15),
    width: '87%',
    height: '100%',
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

export default SearchBox;
