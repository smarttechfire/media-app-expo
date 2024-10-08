import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import getUserData from './../services/userServices';
import { AuthProvider, useAuth } from '../contexts/AuthProvider';
import '../global.css';
import { supabase } from '../utils/supabase';

const Layout = () => {
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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('session user: ', session?.user?.id);
      if (session?.user) {
        const userId = session.user.id;
        console.log('sathish id', userId);

        if (userId) {
          setAuth(session.user);
          await fetchAndSetUserData(userId, session?.user?.email);

          router.replace('/home');
        } else {
          console.error('User ID is undefined or invalid');
        }
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchAndSetUserData = async (userId, email) => {
    try {
      if (!userId) throw new Error('User ID is missing');

      const res = await getUserData(userId); // Ensure userId is passed to the service
      console.log(res);

      if (res.success) {
        setUserData(...res.data, email);
      } else {
        console.error('Error fetching user data:', res.msg);
      }
    } catch (error) {
      console.error('Fetching user data failed:', error.message);
    }
  };

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
