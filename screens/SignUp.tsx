// app/screens/SignUp.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../FirebaseConfig";

import HeadngStyle from "../components/Texts/HeadingText";
import ParaGraph from "../components/Texts/paragraphText";
import TextInputarea from "../components/Texts/TextInput";
import SignUpButton from "../components/Buttons/SignUpButton";
import TextDivider from "../components/Texts/dividerText";
import TransBlock from "../components/Buttons/transparentBlocks";
import { signupSchema } from "./utils/schema";
import { GlobalColors } from "./utils/globalColors";

const { height, width } = Dimensions.get("window");

const SignUpScreen = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const handleSignUp = async (values: {
    emailAddress: string;
    firstName: string;
    password: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.emailAddress,
        values.password
      );
      console.log("User signed up:", userCredential.user);
      router.replace("(tabs)");
    } catch (error: any) {
      console.error("Sign-up error:", error);
      Alert.alert("Sign-up Failed", error.message);
    }
  };

  return (
    <Formik
      initialValues={{ emailAddress: "", firstName: "", password: "" }}
      onSubmit={handleSignUp}
      validationSchema={signupSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <LinearGradient
          colors={["#000000", "#34004E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.header}>
              <HeadngStyle Heading="Getting Started" />
            </View>

            <View style={styles.textInputView}>
              <ParaGraph content="Email Address" style1={styles.label} />
              <TextInputarea
                place="you@example.com"
                valueState={values.emailAddress}
                methodd={handleChange("emailAddress")}
              />
              {touched.emailAddress && errors.emailAddress && (
                <Text style={styles.errorText}>{errors.emailAddress}</Text>
              )}

              <ParaGraph content="First Name" style1={styles.label} />
              <TextInputarea
                place="First Name"
                valueState={values.firstName}
                methodd={handleChange("firstName")}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <ParaGraph content="Password" style1={styles.label} />
              <TextInputarea
                place="Password"
              
                valueState={values.password}
                methodd={handleChange("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <SignUpButton buttonText="Sign Up" press={handleSubmit} />

            <TextDivider />

            <View style={styles.socialRow}>
              <TransBlock iconName="google" onPress={() => {router.navigate('/login')}} />
              <TransBlock iconName="apple" onPress={() => {}} />
              <TransBlock iconName="facebook" onPress={() => {}} />
            </View>

            {/* extra bottom padding */}
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </LinearGradient>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollView: {
    paddingBottom: height * 0.2,
  },
  header: {
    marginTop: height * 0.1,
    alignItems: "center",
  },
  textInputView: {
    marginTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontSize: 16,
    color: GlobalColors.paraGraphColor,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.04,
    marginTop: height * 0.04,
  },
  bottomSpacer: {
    height: height * 0.1,
  },
});

export default SignUpScreen;
