import React from 'react';
import {  Alert, Text } from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper'
import { supabase } from '../../utils/supabase';
import Button from '../../components/Button'
import { useAuth } from '../../contexts/AuthProvider';

export default function Home() {

  const {user} = useAuth();

  // console.log("user: ", user);
  


  const onLogout = async () =>{
    const { error } = await supabase.auth.signOut();
  if (error) {
      Alert.alert('Sign Out', 'Error signing out!');
  }else{
      console.log('logout done');
    
  }
  }
  return (
    <ScreenWrapper>
      <Text>Hme</Text>
      <Button title="logout" onPress={onLogout} />

     </ScreenWrapper>
  );
}


