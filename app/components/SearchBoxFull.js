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
import {hp, wp} from '../config/dpTopx';

export default function SearchBoxFull({
  onBackButtonClick = () => {},
  onClearClick = () => {},
  value,
  onInput = () => {},
  onSubmitClick = () => {},
  onInputFocus = () => {},
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.searchIcon} onPress={onBackButtonClick}>
          <Feather name="arrow-left" size={hp(25)} color={colors.black} />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          onFocus={onInputFocus}
          placeholder="Search for books..."
          style={styles.searchInput}
          value={value}
          onChangeText={text => onInput(text)}
          returnKeyType={'search'}
          returnKeyLabel={'Search'}
          onSubmitEditing={onSubmitClick}
          // onFocus={onSearchFocus}
        />
        {value !== '' && (
          <TouchableOpacity
            style={styles.searchIconClear}
            onPress={onClearClick}>
            <Feather name="x" size={hp(25)} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: hp(54),
    width: '100%',
  },
  inputWrapper: {
    paddingHorizontal: wp(10),
    height: hp(54),
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    elevation: 10,
    // backgroundColor: 'white',
  },
  searchInput: {
    paddingTop: hp(10),
    paddingHorizontal: wp(15),
    flex: 1,
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
  searchIconClear: {
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: wp(30),
    // backgroundColor: 'red',
  },
});
