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

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorProfile, getBook, likeBook} from '../redux/actions/books';
import IoNicIcon from 'react-native-vector-icons/Ionicons';
import ButtonV1 from '../components/ButtonV1';
import {addCartItems, removeCartItems} from '../redux/actions/cart';

export default function BookViewer({route, navigation}) {
  const [isLike, setIsLike] = useState(false);
  const [isOwn, setIsOwn] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const {book, from} = route.params;
  const [author, setAuthor] = useState({});
  const like_books = useSelector(state => state.books.like_books);
  const user_library = useSelector(state => state.books.user_library);

  const cart_item = useSelector(state => state.cart.cart_items);
  const user_books = useSelector(state => state.books.user_books);

  useEffect(() => {
    checkIfExist();
  }, []);

  const checkIfExist = () => {
    const isInUserLibrary = user_library.filter(
      item => item.book.id === book.id,
    );
    const isInUserBooks = user_books.filter(item => item.book.id === book.id);

    if (isInUserLibrary.length !== 0 || isInUserBooks.length !== 0) {
      setIsOwn(true);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    isLikeBook();
    isInCartBook();
  }, []);

  const isInCartBook = () => {
    const check_is_in_cart = cart_item.filter(item => item.id === book.id);
    if (check_is_in_cart.length !== 0) {
      setIsInCart(true);
    }
  };

  const isLikeBook = () => {
    const check_like = like_books.filter(item => item.book.id === book.id);
    if (check_like.length !== 0) {
      setIsLike(true);
    }
  };

  const onLikeClick = () => {
    setIsLike(!isLike);
    dispatch(likeBook(book.id));
  };

  const handleReadNow = () => {
    if (book.content_type === 'write') {
      navigation.navigate('BookReaderPdf', {
        book: book,
      });
      return;
    }
    navigation.navigate('BookReader', {
      book: book,
    });
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      handleAddToCart();
    }
    navigation.navigate('ShoppingCart');
  };

  const handleAddToCart = () => {
    addedToCartToast(book.title);
    setIsInCart(true);
    dispatch(addCartItems(book));
  };

  const handleRemoveFromCart = () => {
    removeFromCartToast(book.title);
    setIsInCart(false);
    dispatch(removeCartItems(book.id));
  };

  const fetchUserProfile = () => {
    dispatch(getAuthorProfile(book.id, handleResp));
  };

  const handleResp = (data, status) => {
    if (status < 300) {
      setAuthor(data.author);
    }
  };

  const addedToCartToast = title => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: 'Added To your cart',
    });
  };

  const removeFromCartToast = title => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: 'Remove from your cart',
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{uri: book.book_cover}}
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
              source={{uri: book.book_cover}}
              style={{flex: 1, resizeMode: 'stretch'}}
            />
          </View>
          <View style={styles.heartButtonContainer}>
            <TouchableOpacity
              onPress={() => onLikeClick()}
              activeOpacity={0.5}
              style={[
                styles.heartButton,
                {backgroundColor: colors.black},
                // isLike
                //   ? {backgroundColor: colors.white}
                //   : // eslint-disable-next-line react-native/no-inline-styles
                //     {backgroundColor: '#ea5f5e'},
              ]}>
              <IoNicIcon
                name="heart"
                size={hp(25)}
                color={isLike ? '#ea5f5e' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.section}>
          {!isOwn && <Text style={styles.bookPrice}>₦ {book.price}</Text>}
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <View style={styles.profileWrapper}>
            <TouchableOpacity
              style={styles.authorProfile}
              onPress={() =>
                navigation.navigate('AuthorProfile', {book_id: book.id})
              }>
              <Image
                source={{uri: author.profile_picture}}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AuthorProfile', {book_id: book.id})
              }>
              <Text style={styles.authorName}>{book.author}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookStatisticWrapper}>
            <View style={styles.statisticWrapper}>
              <IoNicIcon name="star" size={hp(15)} color={colors.secondary} />
              <Text style={styles.statisticText}>{'4.9'}</Text>
            </View>
            <Text style={styles.reviewText}>
              Mostly Positive{' '}
              <Text style={styles.reviewTextCounter}>(458 Reviews)</Text>
            </Text>
            {/* <View style={styles.statisticWrapper}>
              <Feather name="book-open" size={hp(15)} color={colors.primary} />
              <Text style={styles.statisticText}>{book.readers}</Text>
            </View>
            <View style={styles.statisticWrapper}>
              <Feather name="heart" size={hp(15)} color={colors.primary} />
              <Text style={styles.statisticText}>{book.likes}</Text>
            </View> */}
          </View>
          {/* <View
            style={{width: '100%', height: hp(2), backgroundColor: colors.grey}}
          /> */}
          <Text style={styles.bookSynopsisHeader}>Introduction</Text>
          <Text style={styles.bookSynopsis}>{book.book_summary}</Text>
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
        {!isOwn && (
          <ButtonV1
            // title="Buy  ₦180"
            title={isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
            style={{
              width: '49%',
              backgroundColor: 'red',
              alignSelf: 'center',
              shadowOpacity: 0.1,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              shadowColor: colors.primary,
              elevation: 3,
            }}
            buttonStyle={isInCart ? 'filled' : 'outline'}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          />
        )}
        <ButtonV1
          // title="Buy  ₦180"
          title={isOwn ? 'Read' : `BUY NOW`}
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
            isOwn && {width: '100%'},
          ]}
          onClick={isOwn ? handleReadNow : handleBuyNow}
        />
      </View>
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
  heartButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ea5f5e',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#cbccce',
    marginTop: hp(6),
    // opacity: 0.5,
  },
  bookSynopsis: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: '#cbccce',
    marginTop: hp(6),
    // opacity: 0.5,
  },
});
