import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Loading from '../components/Loading';

export default function Home() {
  const router = useRouter();
  return (
  <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
    <Loading />
  </View>
  );
}
