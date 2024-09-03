import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthProvider';
import '../global.css';

import {  Stack, useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';


const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}



const MainLayout = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);
      if (session) {
        setAuth(session?.user);
        router.replace('/home');
        console.log('Email', session?.user?.email);
      } else {
        setAuth(null);
        router.replace('/welcome')
      }
    })
  },[])

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default _layout;