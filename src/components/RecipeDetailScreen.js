import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { toggleFavorite } from '../redux/favoritesSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RecipeDetailScreen = (props) => {
  const recipe = props.route.params; // Get recipe data passed from HomeScreen
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  const isFavorite = favoriteRecipes.some(
    (fav) => fav.idFood === recipe.idFood
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Title */}
      <View style={styles.titleContainer} testID="recipeTitle">
        <Text style={styles.recipeTitle}>{recipe.recipeTitle}</Text>
      </View>

      {/* Recipe Category */}
      <View style={styles.categoryContainer} testID="recipeCategory">
        <Text style={styles.recipeCategory}>{recipe.recipeCategory}</Text>
      </View>

      {/* Miscellaneous Info */}
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

      {/* Ingredients Section */}
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

      {/* Instructions Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          {recipe.recipeInstructions}
        </Text>
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  recipeImage: {
    width: wp('100%'),
    height: hp('30%'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  backButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
  },
  favoriteButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  recipeTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
  },
  categoryContainer: {
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  recipeCategory: {
    fontSize: hp('2%'),
    color: '#888',
  },
  miscContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2%'),
  },
  miscItem: {
    alignItems: 'center',
  },
  miscIcon: {
    fontSize: hp('3%'),
  },
  miscText: {
    fontSize: hp('1.8%'),
    color: '#555',
  },
  sectionContainer: {
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('1%'),
  },
  ingredientsList: {
    marginBottom: hp('2%'),
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF8C00',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: hp('2%'),
    color: '#555',
  },
  instructionsText: {
    fontSize: hp('2%'),
    color: '#555',
    lineHeight: hp('3%'),
  },
});
