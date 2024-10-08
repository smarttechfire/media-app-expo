import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Icon from '../../assets/icons';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthProvider';
import { hp, wp } from '../../helpers/common';

export default function Home() {
  const { user, setAuth } = useAuth();
  const router = useRouter();
  // Error handling: Check if user object exists and has id
  useEffect(() => {
    if (!user || !user.id) {
      Alert.alert('Error', 'User data is not available.');
      console.error('User is not defined or user.id is missing.');
    } else {
      console.log('user', user.id);
    }
  }, [user]);

  const { session } = useAuth();

  useEffect(() => {
    if (session) console.log('My Login success');
  }, [session]);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>LinkUp</Text>
        <View style={styles.icons}>
          <Pressable onPress={() => router.push('notifiactions')}>
            <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={() => router.push('newPost')}>
            <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={() => router.push('profile')}>
            <Avatar
              uri={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
              style={{ borderWidth: 2 }}
            />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold,
  },
});
