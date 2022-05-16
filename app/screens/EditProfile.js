/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {logUserOut, updateUserProfile} from '../redux/actions/auth';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

import LoadingPart from '../components/LoadingPart';

// My Package

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [picture, setPicture] = useState(user.profile_picture);
  const [user_bio, setUserBio] = useState(user.about_me);

  const [bioInputFocus, setBioInputFocus] = useState(false);

  const handleImagePicker = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        //let source = response;
        // You can also display the image using data:

        let image = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setPicture(image);
      }
    });
  };

  const showToastStatus = (type, title, subtitle) => {
    Toast.show({
      type: type,
      text1: title,
      text2: subtitle,
    });
  };

  const handleUpdateUserProfile = () => {
    dispatch(
      updateUserProfile(
        {profile_picture: picture, about_me: user_bio},
        handleResp,
      ),
    );
  };

  const handleResp = status => {
    if (status === 200) {
      showToastStatus(
        'success',
        'Successful',
        'you have successfully update your profile',
      );
      navigation.goBack();
      return;
    }

    showToastStatus(
      'error',
      'Failed',
      'Something is wrong please try again later',
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" color={colors.white} size={hp(25)} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleUpdateUserProfile}>
            <Text style={styles.headerTitle}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{uri: picture.uri ? picture.uri : picture}}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            style={styles.cameraIconStyle}
            activeOpacity={0.5}
            onPress={handleImagePicker}>
            <Feather name="camera" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.inputWrapper, {marginTop: hp(50)}]}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            value={name}
            style={styles.inputContainer}
            onFocus={() => console.log('hello')}
          />
        </View> */}
        <View style={[styles.inputWrapper, {flex: 1, marginTop: hp(20)}]}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            onChangeText={text => setUserBio(text)}
            multiline={true}
            value={user_bio}
            numberOfLines={2}
            style={[
              styles.inputContainer,
              bioInputFocus && {borderBottomColor: colors.primary},
            ]}
            onFocus={() => setBioInputFocus(true)}
            onBlur={() => setBioInputFocus(false)}
          />
        </View>
        {/* <Text style={styles.userBio}>{user.about_me}</Text> */}
      </ScrollView>
      {isLoading && <LoadingPart title={'saving'} />}
      <Toast
        position="top"
        topOffset={20}
        autoHide={true}
        visibilityTime={1000}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
    paddingHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
    // textAlign: 'center',
    // marginLeft: wp(80),
  },
  editProfileButton: {
    alignItems: 'center',
    paddingVertical: hp(10),
    paddingHorizontal: wp(10),
    backgroundColor: colors.secondary,
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  editProfileText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(10),
    color: colors.white,
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    marginTop: hp(20),
    alignSelf: 'center',
  },
  profileImageWrapper: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  profileImage: {
    width: 130,
    height: 130,
  },
  cameraIconStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
  },
  authorNameWrapper: {
    marginTop: hp(10),
    // backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(20),
    color: colors.black,
    textAlign: 'center',
    marginRight: wp(2),
    marginTop: hp(3),
  },
  userBio: {
    // marginTop: hp(13),
    // marginBottom: hp(12),
    // fontFamily: 'Poppins-Medium',
    // fontSize: hp(14),
    // paddingHorizontal: 20,
    // color: colors.grey,
    // textAlign: 'center',
    width: wp(275),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-light',
    color: colors.black,
    fontSize: hp(14),
    marginTop: hp(13),
    marginBottom: hp(17),
  },
  inputWrapper: {
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
  },
  inputContainer: {
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    fontSize: hp(18),
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  followBookLikeWrapper: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    marginHorizontal: wp(15),
  },
  textTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.grey,
  },
  textAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: colors.black,
  },
  categoriesHeader: {
    marginTop: hp(5),
    // height: hp(60),
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.grey,
    // backgroundColor: 'red',
    width: '100%',
  },
  categoryItemWrapper: {
    height: '100%',
    paddingHorizontal: wp(10),
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: hp(15),
  },
  categoryItem: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    // height: '100%',

    color: colors.black,
    // backgroundColor: 'red',
    paddingVertical: hp(16),
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey,
  },
  profileSettingWrapper: {
    backgroundColor: colors.white,
    marginTop: hp(30),
    width: '100%',
    height: hp(200),
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  profileItemWrapper: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextTitle: {
    marginTop: hp(4),
    marginLeft: wp(14),
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: colors.black,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#EFEDF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
