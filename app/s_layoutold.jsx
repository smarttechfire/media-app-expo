import { AuthProvider, useAuth } from '../contexts/AuthProvider';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import getUserData from './../services/userServices';

import '../global.css';

import { supabase } from '../utils/supabase';

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('session user: ', session?.user?.id);
      if (session) {
        setAuth(session?.user);
        await updateUserData(session?.user);
        router.replace('/home');
        // console.log('Email', session?.user);
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  const updateUserData = async (userId) => {
    const res = await getUserData(userId);
    // if (res.success) setUserData(res.data);
    console.log('rajini', res);
  };

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
