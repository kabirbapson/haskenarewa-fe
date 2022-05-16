import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

import EncryptedStorage from 'react-native-encrypted-storage';

// Screens
import HomeScreen from '../screens/HomeScreen';
import BookViewer from '../screens/BookViewer';
import BookReader from '../screens/BookReader';
import Pages from '../screens/Pages';
import AuthorProfile from '../screens/AuthorProfile';
import Notifications from '../screens/Notifications';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
// import MyDrawer from '../screens/DrawerScreen';

import {
  SET_TOKEN,
  SET_TOKEN_FAILED,
  USER_LOADING,
  USER_RESTORING,
} from '../redux/constants/auth';
import {restoreUser} from '../redux/actions/auth';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyEmail from '../screens/VerifyEmail';
import StepOne from '../screens/StepOne';
import StepTwo from '../screens/StepTwo';
import StepThree from '../screens/StepThree';
import ChangePassword from '../screens/ChangePassword';
import Search from '../screens/Search';
import SearchResult from '../screens/SearchResult';
import Profile from '../screens/TabScreens/Profile';
import EditProfile from '../screens/EditProfile';
import ShoppingCart from '../screens/ShoppingCart';
import CheckOutScreen from '../screens/CheckOutScreen';
import CheckOut from '../screens/CheckOutScreen';
import StartNewBook from '../screens/StartNewBook';
import BookPreview from '../screens/BookPreview';
import BookWriting from '../screens/BookWriting';
import Writing from '../screens/Writing';
import EditBook from '../screens/EditBook';
import BookReaderPdf from '../screens/BookReaderPdf';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    restoreUserToken();
  }, []);

  const restoreUserToken = async () => {
    dispatch({type: USER_RESTORING});
    try {
      const token = await EncryptedStorage.getItem('user_token');
      if (token !== null) {
        dispatch({type: SET_TOKEN, payload: token});
      } else {
        dispatch({type: SET_TOKEN_FAILED});
        return;
      }
    } catch (error) {
      // do nothing
      return;
    }

    dispatch(restoreUser());
  };

  if (auth.isRestoring) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SearchBox"
              component={Search}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResult}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookViewer"
              component={BookViewer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookPreview"
              component={BookPreview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookWriting"
              component={BookWriting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Writing"
              component={Writing}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="EditBook"
              component={EditBook}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="BookReader"
              component={BookReader}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="BookReaderPdf"
              component={BookReaderPdf}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Page"
              component={Pages}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AuthorProfile"
              component={AuthorProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StartNewBook"
              component={StartNewBook}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ShoppingCart"
              component={ShoppingCart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckOut}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StepOne"
              component={StepOne}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StepTwo"
              component={StepTwo}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StepThree"
              component={StepThree}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyEmail"
              component={VerifyEmail}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
