import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import IoNicIcon from 'react-native-vector-icons/Ionicons';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import {useSelector} from 'react-redux';

const Item = ({item, onBookClick}) => {
  return (
    <View style={styles.booksCoverWrapper}>
      <>
        <TouchableOpacity
          style={styles.bookCover}
          onPress={() => onBookClick(item)}>
          <Image
            source={{uri: item.book_cover}}
            style={{width: '100%', height: '100%'}}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: colors.primary,
              paddingVertical: 2,
              paddingHorizontal: 5,
              bottom: 0,
              right: 0,
              borderTopLeftRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: colors.textWhite,
                fontSize: hp(10),
              }}>
              ₦{Number(item.price)}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookName}>{item.title}</Text>
      </>
    </View>
  );
};

const ItemList = ({item, onBookClick}) => (
  <TouchableOpacity
    style={styles.itemContainer}
    activeOpacity={0.5}
    onPress={() => onBookClick(item)}>
    <View style={styles.itemImageWrapper}>
      <Image source={{uri: item.book_cover}} style={styles.itemImage} />
    </View>
    <View style={styles.itemInfoWrapper}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthorList}>{item.author}</Text>
    </View>
    <View style={styles.itemButtonWrapper}>
      {/* <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onBookClick(item.id)}>
        <Feather name="x" size={20} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.bookPrice}>₦ {item.price}</Text> */}
    </View>
  </TouchableOpacity>
);

export default function Pages({route, navigation}) {
  const [listStyle, setListStyle] = useState(false);
  const {sectionId, title} = route.params;
  const data = useSelector(state => state.books.section);
  const section = data.filter(item => item.id === sectionId);

  const renderItemGrid = ({item}) => (
    <Item item={item} onBookClick={handleBookClick} />
  );

  const renderItemList = ({item}) => (
    <ItemList item={item} onBookClick={handleBookClick} />
  );

  const handleBookClick = book => {
    navigation.navigate('BookViewer', {
      book: book,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Feather name={'arrow-left'} size={hp(25)} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setListStyle(!listStyle)}>
          <IoNicIcon
            name={listStyle ? 'grid' : 'list'}
            color={colors.white}
            size={hp(25)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.booksContainer}>
        <FlatList
          key={listStyle ? 1 : 3}
          data={section[0].books}
          renderItem={listStyle ? renderItemList : renderItemGrid}
          keyExtractor={item => item.id}
          numColumns={listStyle ? 1 : 3}
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0, 0.25)',
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    color: colors.textBlack,
  },
  booksContainer: {
    marginTop: hp(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  booksCoverWrapper: {
    // backgroundColor: 'red',
    width: wp(100),
    margin: 5,
  },
  bookCover: {
    backgroundColor: colors.black,
    width: '100%',
    height: hp(160),
    borderRadius: 4,
    overflow: 'hidden',
  },
  bookName: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(10),
    color: colors.black,
  },
  bookAuthor: {
    marginTop: hp(7),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(10),
    color: colors.grey,
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
    width: '60%',
  },
  itemButtonWrapper: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.textBlack,
  },
  bookAuthorItem: {
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
