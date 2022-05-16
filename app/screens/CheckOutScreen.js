import {
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IoNicIcon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import Loading from '../components/Loading';
import {useDispatch} from 'react-redux';
import {checkOutBooks} from '../redux/actions/checkout';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

export default function CheckOut({route, navigation}) {
  const dispatch = useDispatch();
  const webviewRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState(null);
  const {books} = route.params;

  useEffect(() => {
    dispatch(checkOutBooks({books}, fetchCheckOutLink));
  }, []);
  const onMessage = data => {};

  const fetchCheckOutLink = (data, status) => {
    if (status < 300) {
      setLink(data.data.link);
      setIsLoading(false);
    }
  };

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };

  const onNavigationStateChange = webViewState => {
    console.log(webViewState.url);
  };

  if (isLoading) {
    return <Loading title={'Please Wait'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        onNavigationStateChange={onNavigationStateChange}
        scalesPageToFit={false}
        onMessage={onMessage}
        source={{
          uri: link,
        }}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
        ref={webviewRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
