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
  DrawerLayoutAndroid,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

// My Package
import colors from '../../../assets/colors/colors';
import Card from '../../components/Card';
import CarouselCard from '../../components/CarouselCards';
import HeroCard from '../../components/HeroCard';
import SearchBoxClick from '../../components/SearchBoxClick';
import SectionCard from '../../components/SectionsCard';
import {wp, hp} from '../../config/dpTopx';

import Header from '../../components/Header';
import Search from '../Search';

function Home({navigation}) {
  const user = useSelector(state => state.auth.user);
  const trending_books = useSelector(state => state.books.trending_books);
  const recommended_books = useSelector(state => state.books.recommended_books);
  const section = useSelector(state => state.books.section);

  const handleBookNavigation = book => {
    navigation.navigate('BookViewer', {
      book: book,
      from: 'Read',
    });
  };

  const navigateToSection = (title, sectionId) => {
    navigation.navigate('Page', {title: title, sectionId: sectionId});
  };

  const handleSearchBox = () => {
    navigation.navigate('SearchBox');
  };

  return (
    <>
      {/* <View style={styles.searchBarStyle}>
        <SearchBox />
      </View> */}
      <ScrollView style={styles.container}>
        {/* Header Wrapper  */}
        <View style={{paddingHorizontal: 25}}>
          <Header
            user={user}
            onCLickSearch={() => navigation.navigate('SearchBox')}
            onNotificationClick={() => navigation.navigate('Notifications')}
            onCartClick={() => navigation.navigate('ShoppingCart')}
            onProfileClick={() => navigation.navigate('Profile')}
          />
        </View>
        <SearchBoxClick onSearchFocus={handleSearchBox} />
        <Text />
        <CarouselCard data={trending_books} onClick={handleBookNavigation} />
        <Text />
        {section.map(item => (
          <SectionCard
            key={item.id}
            sectionId={item.id}
            title={item.title}
            data={item.books}
            handleBookClick={handleBookNavigation}
            handleSeeAllClick={navigateToSection}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
    // paddingHorizontal: 25,
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
  searchBarStyle: {
    backgroundColor: colors.background,
    // borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'flex-end',
    height: 100,
    zIndex: 10,
    paddingHorizontal: 15,
  },
});

export default Home;
