import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import HeadngStyle from "../components/Texts/HeadingText";
import ParaGraph from "../components/Texts/paragraphText";
import { GlobalColors } from "./utils/globalColors";
import TextInputarea from "../components/Texts/TextInput";
import SignUpButton from "../components/Buttons/SignUpButton";
import TextDivider from "../components/Texts/dividerText";
import TransBlock from "../components/Buttons/transparentBlocks";
import { useRouter } from 'expo-router';
import { Formik } from "formik";
import userschema from "./utils/schema";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { app } from "../FirebaseConfig"; // adjust the path if needed

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    console.log('Login Screen Loaded');
  }, []);

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.username, values.password);
      console.log('User logged in:', userCredential.user);
     // router.replace("(tabs)"); // Navigate to (tabs) after successful login
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={userschema}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <LinearGradient
          colors={["#000000", "#34004E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <ScrollView style={styles.height} scrollEnabled={true}>
            <View style={styles.container}>
              <HeadngStyle Heading="Welcome Back" />
              <ParaGraph
                content="Welcome Back We Missed You"
                style1={styles.paragraph1}
              />
            </View>

            <View style={styles.textInputView}>
              <ParaGraph content="UserName" style1={styles.heading2} />
              <TextInputarea place={"Username"} valueState={values.username} methodd={handleChange('username')} />
              {errors.username && <Text style={styles.errorTextStyle}>{errors.username}</Text>}

              <ParaGraph content="Password" style1={styles.heading2} />
              <TextInputarea place={'Password'} valueState={values.password} methodd={handleChange('password')} />
              {errors.password && <Text style={styles.errorTextStyle}>{errors.password}</Text>}
            </View>

            <SignUpButton buttonText={"Sign In"} press={handleSubmit} />

            <TextDivider />
            <View style={styles.bottomTab}>
              <TransBlock iconName={"google"}  onPress={()=>router.navigate('/signup')}/>
             
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
    alignContent: 'center',
  },
  container: {
    flexDirection: "column",
  },
  height: {
    alignContent: 'center',
    marginTop: height * 0.1,
  },
  paragraph1: {
    fontSize: 13.5,
    paddingLeft: width * 0.04,
    width: width,
    color: GlobalColors.paraGraphColor,
    textAlign: 'center',
  },
  textInputView: {
    flexDirection: "column",
    marginTop: 50,
  },
  heading2: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 30,
    marginTop: 10,
    color: GlobalColors.paraGraphColor,
  },
  bottomTab: {
    flexDirection: "row",
    alignSelf: "center",
    gap: width * 0.04,
    marginTop: 20,
  },
  gradient: {
    flex: 1,
  },
  errorTextStyle: {
    color: 'red',
    marginLeft: width * 0.07,
  },
});

export default LoginScreen;
