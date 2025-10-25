import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Corrected key to match the slice
  const favoriteRecipesList = useSelector(
    (state) => state.favorites.favoriteRecipes
  );

  const handleRecipeClick = (recipe) => {
    // Pass the full recipe object
    navigation.navigate("RecipeDetail", recipe);
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => handleRecipeClick(item)}
      testID="favoriteRecipeCard"
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
      ) : (
        <View style={[styles.recipeImage, { justifyContent: "center", alignItems: "center" }]}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.recipeTitle}>
        {item.title.length > 20
          ? item.title.substring(0, 20) + "..."
          : item.title}
      </Text>
    </TouchableOpacity>
  );

  if (!favoriteRecipesList || favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="favoriteRecipes">
      <Text style={styles.heading}>My Favorite Recipes</Text>

      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavoriteItem}
        numColumns={2} // optional, for grid layout
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: hp(2),
    textAlign: "center",
  },
  backButtonTop: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: hp(2),
  },
  backButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: 5,
    marginTop: hp(2),
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: hp(4),
    alignItems: "center",
  },
  recipeCard: {
    width: wp(42),
    margin: wp(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    paddingBottom: hp(1),
  },
  recipeImage: {
    width: "100%",
    height: hp(20),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginTop: hp(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
    marginBottom: hp(2),
  },
});
