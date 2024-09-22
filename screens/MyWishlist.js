import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { products } from '../data/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const MyWishlist = ({ navigation }) => {
  const renderMyWishlist = () => {
    return (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ProductCard
            name={item.name}
            type={item.type}
            rating={item.rating}
            price={item.price}
            image={item.image}
          />
        )}
      />
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="My Wishlist" />
        <ScrollView showsVerticalScrollIndicator={false}>{renderMyWishlist()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
  },
});

export default MyWishlist;
