import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import SearchBoxFull from '../components/SearchBoxFull';
import {hp, wp} from '../config/dpTopx';

const Item = ({item, onBookClick}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.bookListContainer}
    onPress={() => onBookClick(item)}>
    <View style={styles.bookCover}>
      <Image
        source={{uri: item.book_cover}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%', height: '100%'}}
      />
    </View>
    <View style={styles.bookInfoWrapper}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>by {item.author}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchResult({route, navigation}) {
  const renderItem = ({item}) => (
    <Item item={item} onBookClick={handleBookClick} />
  );
  const {search, result} = route.params;

  const handleBookClick = book => {
    navigation.navigate('BookViewer', {
      book: book,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={hp(25)} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.searchText}>{search}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SearchBox')}>
          <Feather name="search" size={hp(25)} color={colors.black} />
        </TouchableOpacity>
      </View>
      {result.length !== 0 ? (
        <>
          <View style={styles.filterWrapper}>
            {/* <TouchableOpacity style={styles.filterItemWrapper}>
              <Text style={styles.filterItemText}>Action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterItemWrapper}>
              <Text style={styles.filterItemText}>Islamic</Text>
            </TouchableOpacity> */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                paddingHorizontal: 15,
                fontSize: hp(16),
                color: colors.black,
              }}>
              Your Search Result for{' '}
              <Text style={{color: colors.secondary}}>{search}</Text>
            </Text>
          </View>
          <View style={styles.searchResultContainer}>
            <FlatList
              data={result}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      ) : (
        <View style={styles.errorWrapper}>
          <Image
            source={require('../../assets/images/not_found_v1.png')}
            style={styles.illustrate}
          />
          <Text style={styles.errorHeader}>No result to show</Text>
          <Text style={styles.errorSubtitle}>
            Please check spelling or try different keywords
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baViewckground,

    // justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: wp(15),
    height: hp(54),
    width: '100%',
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.black,
    // backgroundColor: 'red',
    width: '80%',
  },
  searchResultContainer: {
    paddingHorizontal: wp(20),
  },
  bookListContainer: {
    marginVertical: hp(4),
    flexDirection: 'row',
    padding: hp(10),
    // backgroundColor: colors.background,
  },

  filterItemWrapper: {
    width: wp(81),
    height: hp(27),
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },
  filterItemText: {},
  bookCover: {
    width: wp(50),
    height: hp(80),
    borderRadius: 3,
    backgroundColor: colors.grey,
    overflow: 'hidden',
  },
  bookInfoWrapper: {
    marginLeft: wp(10),
  },
  bookTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    paddingRight: 150,
    color: colors.black,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
  },
  CategoryItem: {
    fontFamily: 'Poppins-Light',
    fontSize: hp(14),
  },
  bookInfo: {
    flexDirection: 'row',
    // width: 100,
    // backgroundColor: 'red',
  },
  filterWrapper: {
    flexDirection: 'row',
    paddingHorizontal: wp(15),
    marginTop: hp(20),
    marginBottom: hp(30),
  },
  staticWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(20),
    // backgroundColor: 'red',
  },
  staticItemText: {
    fontFamily: 'Poppins-Light',
    fontSize: hp(12),
    marginLeft: wp(5),
    color: colors.primary,
  },

  errorWrapper: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrate: {
    width: wp(150),
    height: hp(200),
  },
  errorHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(20),
    color: colors.secondary,
  },
  errorSubtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    textAlign: 'center',
    paddingHorizontal: wp(30),
    color: colors.grey,
  },
});
