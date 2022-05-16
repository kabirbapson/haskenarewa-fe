import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import CarouselCardItem from './CarouselCardItem';
import Paginator from './Paginator';

function CarouselCard({image = undefined, onClick = () => {}, data}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onClick(item.book)}
        style={[styles.carouselWrapper]}>
        <Image
          source={{uri: item.cover}}
          style={{width: '100%', height: '100%'}}
        />
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slideRef}
      />
      <Text />
      <Paginator data={data} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    marginLeft: 25,
    width: '100%',
    alignItems: 'center',
  },
  carouselWrapper: {
    height: hp(200),
    width: wp(310),
    marginRight: 35,
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CarouselCard;
