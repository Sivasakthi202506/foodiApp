import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Custom components
import Categories from "../components/categories";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  // --- States ---
  const [activeCategory, setActiveCategory] = useState("Chicken");

  const [categories, setCategories] = useState([
    {
      idCategory: "1",
      strCategory: "Chicken",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/chicken.png",
    },
    {
      idCategory: "2",
      strCategory: "Beef",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/beef.png",
    },
    {
      idCategory: "3",
      strCategory: "Vegetarian",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/vegetarian.png",
    },
    {
      idCategory: "4",
      strCategory: "Dessert",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/dessert.png",
    },
  ]);

  const [allFood, setAllFood] = useState([
    {
      id: "1",
      recipeName: "Grilled Chicken",
      recipeInstructions: "Grill chicken until golden brown and juicy.",
      recipeImage: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      category: "Chicken",
    },
    {
      id: "2",
      recipeName: "Beef Steak",
      recipeInstructions: "Cook steak to your preferred doneness.",
      recipeImage: "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg",
      category: "Beef",
    },
    {
      id: "3",
      recipeName: "Veggie Salad",
      recipeInstructions: "Mix fresh vegetables and dressing together.",
      recipeImage: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      category: "Vegetarian",
    },
    {
      id: "4",
      recipeName: "Chocolate Cake",
      recipeInstructions: "Bake cake and frost with chocolate cream.",
      recipeImage: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
      category: "Dessert",
    },
    {
      id: "5",
      recipeName: "Butter Chicken",
      recipeInstructions: "Cook chicken with butter, cream, and spices.",
      recipeImage: "https://www.themealdb.com/images/media/meals/uwvxpv1511557015.jpg",
      category: "Chicken",
    },
  ]);

  // --- Handler ---
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // --- Filtered foods ---
  const filteredfoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Scrollable content */}
      <ScrollView
        testID="scrollContainer"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer} testID="headerContainer">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello, User!</Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer} testID="titleContainer">
          <Text style={styles.title}>Make your own food</Text>
          <Text style={styles.subtitle}>Stay at home</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoryList} testID="categoryList">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Recipes */}
        <View style={styles.foodList} testID="foodList">
          <Recipes foods={filteredfoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("5%"),
    marginTop: hp("3%"),
  },
  avatar: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    marginRight: wp("3%"),
  },
  greeting: {
    fontSize: wp("5%"),
    fontWeight: "600",
  },
  titleContainer: {
    paddingHorizontal: wp("5%"),
    marginBottom: hp("2%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "#555",
  },
  categoryList: {
    marginVertical: hp("2%"),
  },
  foodList: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("5%"),
  },
});
