import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../FirebaseConfig"; // adjust path if needed

export default function Index() {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/login');  // Logged in users go to tabs
      } else {
        router.replace('/login');   // Others go to login
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
