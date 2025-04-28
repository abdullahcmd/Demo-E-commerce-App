import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useCart } from '@/app/(tabs)/Cartcontext';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen');

export default function ProductDetailScreen() {
  const { id, title, price, image, description, category, rate } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [cart, setCart] = useState<any[]>([]); // Simple local cart

  const handleAddToCart = () => {
    const newItem = {
      id: Number(id),
      title: title as string,
      price: String(price),
      image: image as string,
      quantity: 1, 
    };
    addToCart(newItem);
    Alert.alert('Success', `${title} added to cart!`);
  };
  

  return (
    <View style={styles.screen}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
       <AntDesign name='arrowleft' size={24}/>
      </TouchableOpacity>


        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <Text style={styles.category}>{"\n"}Category: {category}</Text>
        <Text style={styles.descriptionHeading}>{"\n"}Description :</Text>

        <Text style={styles.description}>{"\n"}{description}</Text>
        <Text style={styles.rate}>⭐{rate}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addToCartButton: {
    marginTop: height*0.09,
    backgroundColor: '#edf0ee',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  addToCartText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
   // backgroundColor: 'gray',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
  scrollContainer: {
    paddingTop: 100, 
    alignItems: 'center',
    paddingBottom: 40,
  },
  detail: {
    width: '80%',
  //  height: 100,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  detailtxt: {
    color: 'white',
    fontSize: 30,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding:13,
    textAlign: 'left',
  },
  price: {
    fontSize: 20,
    color: 'black',
    borderWidth:1,
    borderRadius:10,
    padding:10,
    textAlign:'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  category: {
    fontSize: 18,
    color: 'black',
    textAlign:'left',
    fontWeight:'bold',
    paddingLeft:30,
    width:'100%',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
   
    paddingHorizontal:30,
    textAlign: 'left',
    marginTop: 10,
  },descriptionHeading:{
    textAlign:'left',
    fontSize:20,
    borderColor:'black',
    
    marginTop:20,
    borderTopWidth:1,
    width:'100%',
    paddingLeft:30,
    fontWeight:'700',

  },
  rate: {
    fontSize: 20,
    textAlign:'left',
    width:'100%',
    //borderWidth:1,
    color: 'black',
    marginTop: height*0.05,
    paddingHorizontal:30,
  },

});
