/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import Loading from '../components/Loading';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthorProfile,
  getBook,
  likeBook,
  startNewBook,
} from '../redux/actions/books';
import IoNicIcon from 'react-native-vector-icons/Ionicons';
import ButtonV1 from '../components/ButtonV1';
import {addCartItems, removeCartItems} from '../redux/actions/cart';

export default function BookPreview({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const {book, from} = route.params;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {}, []);

  const handleStartWriting = () => {
    setIsLoading(true);
    dispatch(startNewBook(book, handleRespStatus));
  };

  const handleRespStatus = (res_data, status) => {
    if (status !== 200) {
      setIsLoading(false);
      return;
    }

    setData(res_data);

    navigation.navigate('BookWriting', {
      book: res_data,
    });
  };

  if (isLoading) {
    return <Loading title={'Uploading please wait..'} />;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{uri: book.book_cover.uri}}
          blurRadius={70}
          style={styles.bookAndHeaderWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}>
              <Feather name={'arrow-left'} size={hp(25)} color={colors.white} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.headerButton}>
              <Feather
                name={'more-vertical'}
                size={hp(25)}
                color={colors.white}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.bookCover}>
            <Image
              source={{uri: book.book_cover.uri}}
              style={{flex: 1, resizeMode: 'stretch'}}
            />
          </View>
        </ImageBackground>
        <View style={styles.section}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <View style={styles.profileWrapper}>
            <TouchableOpacity style={styles.authorProfile}>
              <Image
                source={{uri: user.profile_picture}}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.authorName}>
                {user.first_name} {user.last_name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookStatisticWrapper}></View>

          <Text style={styles.bookSynopsisHeader}>Introduction</Text>
          <Text style={styles.bookSynopsis}>{book.description}</Text>
        </View>
      </ScrollView>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          paddingHorizontal: 25,
          // backgroundColor: colors.secondary,
          width: '100%',
          // height: 70,
          flexDirection: 'row',
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <ButtonV1
          // title="Buy  ₦180"
          title={'Start Writing'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[
            {
              width: '49%',
              // position: 'absolute',
              alignSelf: 'center',
              shadowOpacity: 0.1,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              shadowColor: colors.primary,
              elevation: 3,
            },
            {width: '100%'},
          ]}
          onClick={handleStartWriting}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bookAndHeaderWrapper: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
    // backgroundColor: 'blue',
    height: hp(350),
    resizeMode: 'cover',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0, 0.25)',
  },
  bookCover: {
    marginTop: hp(13),
    width: wp(150),
    height: hp(230),
    backgroundColor: colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  heartButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ea5f5e',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: hp(20),
    shadowColor: colors.black,
    elevation: 3,
  },

  section: {
    marginTop: hp(20),
    paddingHorizontal: 25,
  },
  bookPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(24),
    color: colors.secondary,
  },
  bookTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(18),
    color: colors.black,
    // backgroundColor: 'red',
    width: '62%',
  },
  profileWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorProfile: {
    width: 25,
    height: 25,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  authorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(14),
    color: colors.grey,
    marginLeft: wp(5),
  },
  bookStatisticWrapper: {
    marginTop: hp(25),
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp(15),
    alignSelf: 'center',
  },
  statisticWrapper: {
    // marginTop: hp(25),
    marginRight: wp(9),
    flexDirection: 'row',
    width: wp(60),
    height: hp(30),
    // borderWidth: 1,
    backgroundColor: colors.background,
    // borderColor: colors.grey,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticText: {
    marginLeft: wp(2),
    marginTop: hp(5),
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(10),
    color: colors.black,
  },
  reviewText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(12),
    color: colors.textBlack,
  },
  reviewTextCounter: {
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  bookSynopsisHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.grey,
    marginTop: hp(6),
    // opacity: 0.5,
  },
  bookSynopsis: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.grey,
    marginTop: hp(6),
    // opacity: 0.5,
  },
});
