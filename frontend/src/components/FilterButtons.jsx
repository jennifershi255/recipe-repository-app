import { Select, Stack, SimpleGrid, Text, Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { BASE_URL } from "../App";

const FilterButtons = () => {
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories from the API
    fetch(`${BASE_URL}/recipes`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Filter recipes based on selected category
    if (category === "Show All") {
      setFilteredRecipes([]);
    } else {
      const filtered = categories.filter(
        (recipe) => recipe.category === category
      );
      setFilteredRecipes(filtered);
      // Check if there are no recipes in the selected category
      if (filtered.length === 0) {
        setFilteredRecipes([]); // Set filteredRecipes to empty array to display no recipes message
      }
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="Show All">Show All</option>
          <option value="Breakfast"> Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Other">Other</option>
        </Select>
        <Box margin="20px">
          {filteredRecipes.length === 0 &&
          selectedCategory !== "Show All" &&
          selectedCategory !== "" ? (
            <Text>No recipes found in the selected category.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {/* Render filtered recipes */}
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </SimpleGrid>
          )}
        </Box>
        {selectedCategory !== "Show All" ? (
          <hr style={{ margin: "20px", borderWidth: "1px" }} />
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};

export default FilterButtons;
