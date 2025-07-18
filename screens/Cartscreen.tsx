import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../app/(tabs)/Cartcontext';  // Adjust path if needed
const CartScreen = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyButton}>
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.qtyButton}>
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.mainButton} >
                      <Text >Remove</Text>
                    </TouchableOpacity>
                 
                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          </View>
          <View style={styles.totalContainer}>
          <TouchableOpacity onPress={() => {Alert.alert("Chekout!!!",

`Thank you for shopping with us,

Your total is: $${calculateTotal()}`)


}}  style={styles.mainButton} >
                      <Text >Checkout</Text>
                    </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qtyButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  qtyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },mainButton:{
    width:'70%',
    borderWidth:1,
    padding:10,
    alignItems:'center',
    borderRadius:7,
    borderColor:'black'
  }
});

export default CartScreen;
