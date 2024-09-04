import { useEffect } from 'react';

import { AuthProvider, useAuth } from '../contexts/AuthProvider';
import '../global.css';

import { Stack, useRouter } from 'expo-router';

import { supabase } from '../utils/supabase';

import getUserData from './../services/userServices'


const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}



const MainLayout = () => {
  const {  setAuth, setUserData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace('/home');
        // console.log('Email', session?.user);
      } else {
        setAuth(null);
        router.replace('/welcome')
      }
    })
  },[])

  

  const updateUserData = async (user) => {
    const res = await getUserData();
    if (res.success) setUserData(res.data);
    console.log(res.data);
    
    
    
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default _layout;