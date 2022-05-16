import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoNicIcon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './TabScreens/Home';
import colors from '../../assets/colors/colors';
import ReadingNow from './TabScreens/ReadingNow';
import AddOrRead from './TabScreens/AddOrRead';
import Library from './TabScreens/Library';
import Profile from './TabScreens/Profile';
import {hp} from '../config/dpTopx';
import {useDispatch} from 'react-redux';
import {getUserFollow, restoreUser} from '../redux/actions/auth';
import {
  getLikeBooks,
  getMyLibrary,
  getReadingList,
  getSections,
  getTrendingBillboard,
  getUserBooks,
} from '../redux/actions/books';

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
    dispatch(getUserFollow());
    dispatch(getTrendingBillboard());
    dispatch(getSections());
    dispatch(getReadingList());
    dispatch(getMyLibrary());
    dispatch(getLikeBooks());
    dispatch(getUserBooks());
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          //   backgroundColor: colors.secondary,
          height: hp(80),
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reading') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === ' ') {
            iconName = focused ? 'plus' : 'plus';
          } else if (route.name === 'Write') {
            iconName = focused ? 'typewriter' : 'typewriter';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          // You can return any component that you like here!
          return route.name !== ' ' ? (
            route.name === 'Write' ? (
              <View style={{alignItems: 'center'}}>
                <MaterialComIcon name={iconName} size={hp(30)} color={color} />
                <Text
                  style={[
                    {fontFamily: 'Poppins-Medium', fontSize: hp(10)},
                    focused && {color: colors.primary},
                  ]}>
                  {route.name}
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <IoNicIcon name={iconName} size={hp(25)} color={color} />
                <Text
                  style={[
                    {fontFamily: 'Poppins-Medium', fontSize: hp(10)},
                    focused && {color: colors.primary},
                  ]}>
                  {route.name}
                </Text>
              </View>
            )
          ) : (
            <TouchableOpacity style={styles.plusWrapper}>
              <Feather name={iconName} size={24} color={colors.primary} />
            </TouchableOpacity>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textBlack,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Reading"
        component={ReadingNow}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name=" "
        component={AddOrRead}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen
        name="Write"
        component={Library}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  plusWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    elevation: 10,
  },
});

export default HomeScreen;
