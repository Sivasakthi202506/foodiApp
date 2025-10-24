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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen(props) {
  const recipe = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      {/* Back and Favorite Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavourite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title & Category */}
      <View style={styles.contentContainer}>
        <View style={styles.recipeDetailsContainer} testID="recipeDetailsContainer">
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {recipe.recipeName}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.category}
          </Text>
        </View>

        {/* Misc info */}
        <View style={styles.miscContainer} testID="miscContainer">
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🕒</Text>
            <Text style={styles.miscText}>35 Mins</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>👥</Text>
            <Text style={styles.miscText}>03 Servings</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🔥</Text>
            <Text style={styles.miscText}>103 Cal</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🎚️</Text>
            <Text style={styles.miscText}>Medium</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList} testID="ingredientsList">
            {recipe.ingredients.map((i, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {i.ingredientName} {i.measure}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContent: { paddingBottom: 30 },
  imageContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  recipeImage: { width: wp(98), height: hp(45), borderRadius: 20 },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: { padding: 10, borderRadius: 20, backgroundColor: "#f0f0f0", marginLeft: wp(5) },
  backButtonText: { fontSize: hp(2), color: "#333", fontWeight: "bold" },
  favoriteButton: { padding: 10, borderRadius: 20, marginRight: wp(5) },
  favoriteButtonText: { fontSize: hp(2), color: "red" },
  contentContainer: { paddingHorizontal: wp(4), paddingTop: hp(4) },
  recipeDetailsContainer: { marginBottom: hp(2) },
  recipeTitle: { fontSize: hp(3), fontWeight: "bold", color: "#4B5563" },
  recipeCategory: { fontSize: hp(2), fontWeight: "500", color: "#9CA3AF" },
  miscContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  miscItem: { alignItems: "center", backgroundColor: "#F5F5F5", padding: 10, borderRadius: 10 },
  miscIcon: { fontSize: hp(3.5), marginBottom: 5 },
  miscText: { fontSize: hp(2), fontWeight: "600" },
  sectionContainer: { marginBottom: hp(2) },
  sectionTitle: { fontSize: hp(2.5), fontWeight: "bold", color: "#4B5563", marginBottom: 10 },
  ingredientsList: { marginLeft: wp(4) },
  ingredientItem: { flexDirection: "row", alignItems: "center", marginBottom: hp(1), padding: 10, backgroundColor: "#FFF9E1", borderRadius: 8 },
  ingredientBullet: { backgroundColor: "#FFD700", borderRadius: 50, height: hp(1.5), width: hp(1.5), marginRight: wp(2) },
  ingredientText: { fontSize: hp(1.9), color: "#333" },
  instructionsText: { fontSize: hp(2), color: "#444", lineHeight: hp(3), textAlign: "justify" },
});
