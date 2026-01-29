import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
//@ts-ignore
import { Color } from '@project-types/enum';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface ScreenLoaderProps {
  networkInfo?: any;
  open: boolean;
}

const ScreenLoader = (props: ScreenLoaderProps) => {
  const {networkInfo, open} = props;
  return (
    open && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          width: '100%',
          height: heightPercentageToDP('100%'),
        }}>
        {networkInfo && networkInfo.isConnected === false && (
          <Text style={{color: 'white', fontSize: 20, marginBottom: 20}}>
            No Internet Connection!
          </Text>
        )}

        {networkInfo && networkInfo.isInternetReachable === false && (
          <Text style={{color: 'white', fontSize: 20, marginBottom: 20}}>
            No Internet Connection!
          </Text>
        )}

        {networkInfo && networkInfo.details?.strength <= 30 && (
          <Text style={{color: 'white', fontSize: 20, marginBottom: 20}}>
            Weak Internet Connection...
          </Text>
        )}
        <ActivityIndicator size="large" color={Color.Primary} />
      </View>
    )
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({});
