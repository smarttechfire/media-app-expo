import React, { useRef, useState } from 'react';
import {  Pressable, StyleSheet, Text, View } from 'react-native';

import Icon from '../assets/icons';
import Button from '../components/Button';

import ScreenWrapper from '~/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Input from '../components/Input';
export default function Login() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading,setLoading] = useState(false);

  const onSubmit = async () => {

  }

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />
        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(2.2), color: theme.colors.text }}>
            Please login to continue
          </Text>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            onChangeText={(value) => emailRef.current = value}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            secureTextEntry
            onChangeText={(value) => passwordRef.current = value}
          />
          <Text style={styles.footerPassword}>Forgot Password?</Text>
          {/* button */}
          <Button title="Login" loading={loading} onPress={onSubmit}  />
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>  
          <Pressable>
            <Text style={[styles.footerText,{color: theme.colors.primaryDark,fontWeight: theme.fonts.semibold}]}>Sign Up</Text>
          </Pressable>
        </View>  
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  footerPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    // fontSize: hp(1.6)
  },
});
