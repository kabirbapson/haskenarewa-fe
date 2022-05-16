/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import {useDispatch, useSelector} from 'react-redux';
import ButtonV1 from '../components/ButtonV1';
import {removeCartItems} from '../redux/actions/cart';

const Item = ({item, onDeleteClick}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemImageWrapper}>
      <Image source={{uri: item.book_cover}} style={styles.itemImage} />
    </View>
    <View style={styles.itemInfoWrapper}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
    </View>
    <View style={styles.itemButtonWrapper}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteClick(item.id)}>
        <Feather name="x" size={20} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.bookPrice}>₦ {item.price}</Text>
    </View>
  </View>
);

export default function ShoppingCart({navigation}) {
  const dispatch = useDispatch();
  const renderCartItem = ({item}) => (
    <Item onDeleteClick={handleDelete} item={item} />
  );

  const [total_amount, setTotalAmount] = useState(0);

  const reading_list = useSelector(state => state.books.reading_list);
  const cart_item = useSelector(state => state.cart.cart_items);

  useEffect(() => {
    handlecalCulateAmount();
  }, [cart_item]);

  const handlecalCulateAmount = () => {
    const amount = cart_item.reduce((prevState, currentState) => {
      return prevState + Number(currentState.price);
    }, 0);

    setTotalAmount(amount);
  };

  const handleDelete = id => {
    dispatch(removeCartItems(id));
  };

  const handleCheckOut = () => {
    const books = cart_item.map(item => {
      return item.id;
    });

    navigation.navigate('Checkout', {
      books: books,
    });
  };

  const item_length = cart_item.length;

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={25} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.pageHeader}>Shopping Cart</Text>
          <TouchableOpacity
            style={[
              styles.buttonWrapper,
              {backgroundColor: colors.background},
            ]}>
            {/* <Feather name="search" size={25} color={colors.white} /> */}
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.bodyContainer,
            item_length !== 0 && {justifyContent: 'flex-start'},
          ]}>
          {item_length === 0 ? (
            <>
              <MaterialIcon
                name="shopping-cart"
                size={hp(100)}
                style={{opacity: 0.5}}
                color={colors.primary}
              />
              <Text style={styles.title}>No Books in the cart</Text>
              <Text style={styles.subtitle}>
                when you add a books to your cart, you'll see them here
              </Text>
            </>
          ) : (
            <FlatList
              data={cart_item}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 20}}
            />
          )}
        </View>
      </View>
      {item_length !== 0 && (
        <View style={styles.bottomTab}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: hp(10),
              paddingHorizontal: 10,
            }}>
            <Text style={styles.totalText}>Total</Text>
            <Text
              style={[
                styles.totalText,
                {
                  fontSize: hp(20),
                  fontFamily: 'Poppins-Bold',
                  color: colors.secondary,
                },
              ]}>
              {`₦ ${total_amount}`}
            </Text>
          </View>
          <ButtonV1 title={'BUY NOW'} onClick={handleCheckOut} />
        </View>
      )}
    </>
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
    marginBottom: hp(20),
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
  bodyContainer: {
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(15),
    height: hp(100),
    // width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    // paddingVertical: hp(15),
    paddingHorizontal: wp(10),
    backgroundColor: '#fff',
  },
  itemImageWrapper: {
    height: hp(80),
    width: '18%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfoWrapper: {
    // backgroundColor: 'red',
    paddingLeft: wp(10),
    width: '60%',
  },
  itemButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: colors.textBlack,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Regular',
  },
  bookPrice: {
    fontFamily: 'Poppins-Bold',
    color: colors.secondary,
    fontSize: hp(14),
  },
  deleteButton: {
    marginBottom: 10,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTab: {
    backgroundColor: colors.white,
    height: hp(140),
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  totalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(18),
    color: colors.textBlack,
  },
});
