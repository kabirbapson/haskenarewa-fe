import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

// My Package
import colors from '../../assets/colors/colors';

import {wp, hp} from '../config/dpTopx';

const Item = ({index, item, handleBookClick}) => {
  return (
    <View style={[styles.booksCoverWrapper, index === 0 && {marginLeft: 20}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.bookCoverWrapper]}
        onPress={() => handleBookClick(item)}>
        <>
          <ImageBackground
            source={{uri: item.book_cover}}
            blurRadius={90}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.book_cover}}
              style={{width: '90%', height: '90%'}}
            />
          </ImageBackground>
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
        </>
      </TouchableOpacity>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        by {item.author}
      </Text>
      <Text style={styles.bookName} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );
};

function SectionCard({
  sectionId,
  title,
  data,
  handleBookClick,
  handleSeeAllClick,
}) {
  const renderItem = ({item, index}) => (
    <Item
      index={index}
      item={item}
      title={title}
      handleBookClick={handleBookClick}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity
          style={styles.seeAllWrapper}
          onPress={() => handleSeeAllClick(title, sectionId)}>
          <Text style={styles.headerLink}>See All</Text>
          <Feather
            name="arrow-right"
            size={hp(20)}
            color={colors.secondary}
            style={{marginBottom: hp(3)}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 10}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          horizontal={true}
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    marginBottom: 10,
    // paddingHorizontal: 25,
  },
  headerWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  seeAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    color: colors.textBlack,
  },
  headerLink: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(14),
    color: colors.secondary,
  },
  booksCoverWrapper: {
    // backgroundColor: 'red',
    marginRight: wp(10),
    width: wp(80),
  },
  bookCoverWrapper: {
    backgroundColor: colors.primary,
    width: '100%',
    height: wp(110),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bookCover: {
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },

  bookName: {
    // backgroundColor: 'red',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(11),
    color: '#4f4f4f',
  },
  bookAuthor: {
    marginTop: hp(7),
    fontFamily: 'Poppins-Light',
    fontSize: hp(10),

    color: colors.grey,
  },
});

export default SectionCard;
