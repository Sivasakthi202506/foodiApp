import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};

  // --- States ---
  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [image, setImage] = useState(recipeToEdit?.image || "");
  const [description, setDescription] = useState(recipeToEdit?.description || "");
  const [instructions, setInstructions] = useState(recipeToEdit?.instructions || "");

  const [ingredients, setIngredients] = useState(
    recipeToEdit?.ingredients?.length > 0
      ? recipeToEdit.ingredients
      : [{ name: "", measure: "" }]
  );

  // --- Handlers ---
  const updateIngredient = (index, key, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][key] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", measure: "" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const saveRecipe = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem("myRecipes");
      const recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];

      const newRecipe = {
        title,
        image,
        description,
        instructions,
        ingredients,
        id: recipeToEdit?.id || Date.now(),
      };

      if (recipeToEdit && recipeIndex !== undefined) {
        // Editing existing
        recipesArray[recipeIndex] = newRecipe;
        if (onrecipeEdited) onrecipeEdited();
      } else {
        // Adding new
        recipesArray.push(newRecipe);
      }

      await AsyncStorage.setItem("myRecipes", JSON.stringify(recipesArray));

      // Refresh previous screen if callback provided
      if (route.params?.refresh) route.params.refresh();

      navigation.goBack();
    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(5) }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: hp(12), textAlignVertical: "top" }]}
      />

      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
        numberOfLines={6}
        style={[styles.input, { height: hp(14), textAlignVertical: "top" }]}
      />

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.map((ing, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            placeholder="Name"
            value={ing.name}
            onChangeText={(val) => updateIngredient(index, "name", val)}
            style={[styles.input, { flex: 2, marginRight: wp(2) }]}
          />
          <TextInput
            placeholder="Measure"
            value={ing.measure}
            onChangeText={(val) => updateIngredient(index, "measure", val)}
            style={[styles.input, { flex: 1 }]}
          />
          {ingredients.length > 1 && (
            <TouchableOpacity onPress={() => removeIngredient(index)}>
              <Text style={styles.removeBtn}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={addIngredient} style={styles.addIngredientBtn}>
        <Text style={styles.addIngredientText}>+ Add Ingredient</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(4), backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: wp(2), marginVertical: hp(1), borderRadius: 5 },
  image: { width: "100%", height: hp(25), marginVertical: hp(1), borderRadius: 8 },
  imagePlaceholder: { height: hp(25), borderWidth: 1, borderColor: "#ddd", textAlign: "center", textAlignVertical: "center", marginVertical: hp(1) },
  sectionTitle: { fontSize: hp(2.5), fontWeight: "bold", marginTop: hp(2) },
  ingredientRow: { flexDirection: "row", alignItems: "center", marginBottom: hp(1) },
  removeBtn: { color: "red", fontWeight: "bold", fontSize: hp(2.2), marginLeft: wp(1) },
  addIngredientBtn: { backgroundColor: "#4F75FF", padding: wp(2), borderRadius: 5, marginVertical: hp(1), alignItems: "center" },
  addIngredientText: { color: "#fff", fontWeight: "bold" },
  saveButton: { backgroundColor: "#10B981", padding: wp(3), borderRadius: 5, marginTop: hp(2), alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: hp(2) },
});
