import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import {useSelector} from 'react-redux';

export default function Header({
  user,
  onNotificationClick,
  onProfileClick = () => {},
  onCartClick = () => {},
  onCLickSearch = () => {},
}) {
  const [notification, setNotification] = useState(0);

  const cart_item = useSelector(state => state.cart.cart_items);

  return (
    <View style={styles.headerWrapper}>
      {/* Profile and message Wrapper */}
      <View style={styles.profileAndMessageWrapper}>
        {/* Profile Picture */}

        <TouchableOpacity
          style={styles.profileWrapper}
          activeOpacity={0.8}
          onPress={() => onProfileClick('Profile')}>
          <Image
            source={{uri: user.profile_picture}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {/* Name and Message Wrapper */}
        <View style={styles.nameAndMessage}>
          <Text style={styles.nameText}>Hi, {user.first_name}</Text>
          {/* <Text style={styles.messageText}>what are you reading today?</Text> */}
        </View>
      </View>
      {/* notification Wrapper  */}
      <View style={styles.leftSideContainer}>
        <TouchableOpacity
          style={styles.notificationWrapper}
          onPress={onCLickSearch}>
          <Feather name="search" color={colors.black} size={hp(24)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationWrapper}
          onPress={onCartClick}>
          <Feather name="shopping-cart" color={colors.black} size={hp(24)} />
          {cart_item.length !== 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCounter}>{cart_item.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationWrapper}
          onPress={onNotificationClick}>
          <Feather name="bell" color={colors.black} size={hp(24)} />
          {notification !== 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCounter}>{notification}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(15),
    // paddingHorizontal: 25,
    // backgroundColor: 'red',
  },
  profileAndMessageWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    padding: 3,
  },
  profileWrapper: {
    // backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameAndMessage: {
    marginLeft: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.textBlack,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(13),
    color: colors.textBlack,
  },
  leftSideContainer: {
    flexDirection: 'row',
  },
  notificationWrapper: {
    width: wp(30),
    height: hp(30),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    width: wp(15),
    height: hp(15),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: wp(2),
    // marginBottom: hp(10),
  },
  notificationCounter: {
    marginBottom: hp(2),
    color: colors.textWhite,
    fontFamily: 'Poppins-Bold',
    fontSize: hp(8),
  },
});
