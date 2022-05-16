import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import {hp} from '../config/dpTopx';

export default function Notifications({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.pageHeader}>Notifications</Text>
        <TouchableOpacity
          style={[styles.buttonWrapper, {backgroundColor: colors.background}]}>
          {/* <Feather name="search" size={25} color={colors.white} /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.notificationsContainer}>
        <MaterialIcon
          name="notifications-none"
          size={hp(100)}
          style={{opacity: 0.5}}
          color={colors.primary}
        />
        <Text style={styles.title}>No notifications</Text>
        <Text style={styles.subtitle}>
          when you have a notification, you'll see them here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.black,
  },
  buttonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(20),
    color: colors.black,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    textAlign: 'center',
    paddingHorizontal: '14%',
  },
});
