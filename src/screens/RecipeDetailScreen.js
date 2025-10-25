import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RecipeDetailScreen({ route }) {
  const recipe = route.params; // full recipe object
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);

  const isFavourite = favoriteRecipes.some((fav) => fav.id === recipe.id);

  const handleToggleFavorite = () => dispatch(toggleFavorite(recipe));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        ) : (
          <View style={[styles.recipeImage, { justifyContent: "center", alignItems: "center" }]}>
            <Text>No Image</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Info */}
      <View style={styles.contentContainer}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        {recipe.description ? <Text style={styles.recipeDescription}>{recipe.description}</Text> : null}

        {/* Ingredients */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>{item.name} {item.measure}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: "#6B7280" }}>No ingredients added.</Text>
          )}
        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions ? (
            <Text style={styles.instructionsText}>{recipe.instructions}</Text>
          ) : (
            <Text style={{ color: "#6B7280" }}>No instructions provided.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 30 },
  imageContainer: { justifyContent: "center", marginBottom: hp(2) },
  recipeImage: { width: wp(90), height: hp(35), borderRadius: 12, alignSelf: "center" },
  topButtonsContainer: { width: "100%", position: "absolute", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: hp(3), paddingHorizontal: wp(4) },
  backButton: { padding: 10, borderRadius: 20, backgroundColor: "#f0f0f0" },
  backButtonText: { fontSize: hp(2), color: "#333", fontWeight: "bold" },
  favoriteButton: { padding: 10, borderRadius: 20 },
  favoriteButtonText: { fontSize: hp(2), color: "red" },
  contentContainer: { paddingHorizontal: wp(4), paddingTop: hp(2) },
  recipeTitle: { fontSize: hp(3), fontWeight: "bold", color: "#111827", marginBottom: hp(1) },
  recipeDescription: { fontSize: hp(2), color: "#4B5563", marginBottom: hp(2) },
  sectionContainer: { marginBottom: hp(2) },
  sectionTitle: { fontSize: hp(2.3), fontWeight: "bold", color: "#111827", marginBottom: hp(1) },
  ingredientItem: { flexDirection: "row", alignItems: "center", marginBottom: hp(0.8) },
  ingredientBullet: { backgroundColor: "#4F75FF", borderRadius: 50, height: hp(1.5), width: hp(1.5), marginRight: wp(2) },
  ingredientText: { fontSize: hp(2), color: "#333" },
  instructionsText: { fontSize: hp(2), color: "#333", lineHeight: hp(3), textAlign: "justify" },
});
