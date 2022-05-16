import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

// My Package
import colors from '../../../assets/colors/colors';
import Card from '../../components/Card';
import HeroCard from '../../components/HeroCard';
import SearchBox from '../../components/SearchBox';
import {wp, hp} from '../../config/dpTopx';

function AddOrRead() {
  return (
    <ScrollView style={styles.container}>
      <Text>Read or add books</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(34),
  },
  profileAndMessageWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    padding: 3,
  },
  profileWrapper: {
    // backgroundColor: 'red',
    width: wp(50),
    height: hp(50),
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: wp(55),
    height: hp(55),
  },
  nameAndMessage: {
    marginLeft: wp(10),
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: colors.textBlack,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: colors.textBlack,
  },
  notificationWrapper: {
    width: wp(40),
    height: hp(40),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    width: wp(18),
    height: hp(18),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: wp(5),
  },
  notificationCounter: {
    marginBottom: hp(2),
    color: colors.textWhite,
    fontFamily: 'Poppins-Bold',
    fontSize: hp(10),
  },
});

export default AddOrRead;
