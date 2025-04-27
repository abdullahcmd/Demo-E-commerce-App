import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import  { colors }  from '../constants/color';

const { width, height } = Dimensions.get('screen');

const images = [
  require('../assets/images/img1 (6).png'),
  require('../assets/images/img1 (2).png'),
  require('../assets/images/img1 (4).png'),
];

const categories = [
  "Mens's clothing",
  "Womens's clothing",
  "Electronics",
  "Accessories",
];

const categoryMapping: { [key: string]: string } = {
  "Womens's clothing": "women's clothing",
  "Mens's clothing": "men's clothing",
  "Electronics": "electronics",
  "Accessories": "jewelery",
};

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollItem} showsVerticalScrollIndicator={false}>

        <View style={styles.BannerContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{ width, height: 140, resizeMode: 'contain' }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.StatusBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectedCategory && (
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <View style={[styles.categoryview, { backgroundColor: 'gray' }]}>
              <Text style={{ color: 'white' }}>Clear</Text>
            </View>
          </TouchableOpacity>
          )}

            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setSelectedCategory(category)}
              >
                <View style={[
                  styles.categoryview, 
                  selectedCategory === category && styles.selectedCategory // highlight if selected
                ]}>
                  <Text style={{ color: selectedCategory === category ? 'white' : 'black' }}>
                    {category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.itemview}>
          {products
            .filter(product => {
              if (!selectedCategory) return true;
              const mappedCategory = categoryMapping[selectedCategory];
              return product.category === mappedCategory;
            })
            .map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => {
                  router.push({
                    pathname: `/product/${product.id}`,
                    params: {
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      category: product.category,
                      price: product.price,
                      image: product.image,
                      rate: product.rating.rate,
                    }
                  });
                }}
              >
                <View style={styles.item}>
                  <Image source={{ uri: product.image }} style={styles.itemimg} />
                  <View style={styles.itemtxt}>
                    <Text numberOfLines={2} style={[styles.itemtxt,{ textAlign: 'center' }]}>{product.title}</Text>
                    <Text style={[styles.itemtxt, {fontWeight: 'bold' }]}>$ {product.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
        <View style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollItem: {},
  page: {
    flex: 1,
    top: 40,
    width: width,
    height: height,
    backgroundColor: colors.a,
    alignItems: 'flex-start',
    bottom:50
  },
  BannerContainer: {
    height: 150,
  },
  StatusBar: {
    padding:10,
    width: width,
    height: 60,
    backgroundColor: colors.b,
    justifyContent: 'center',
  },
  categoryview: {
    backgroundColor: colors.c,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: "black",
  },
  itemview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: width,
  },
  item: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 10,
    height: 300,
    width: (width / 2) - 20,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  itemimg: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  itemtxt: {
    justifyContent: 'center',
    alignItems: 'center',
    color:colors.d
  },
});
