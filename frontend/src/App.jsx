import { Button, Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import { useState, useEffect } from "react";
import FilterButtons from "./components/FilterButtons";

// sets base url for API requests
export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
  const [recipes, setRecipes] = useState([]); // array to store all recipes fetched from the API

  useEffect(() => {
    // Fetch all recipes from backend
    fetch(`${BASE_URL}/recipes`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data); // Set all recipes initially
        setFilteredRecipes(data); // Set filtered recipes initially
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <Stack minH={"100vh"}>
      <Navbar setRecipes={setRecipes} />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          🍴 {""}
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            RECIPE REPOSITORY
          </Text>
          🍴
        </Text>
        <FilterButtons />
        <Text
          margin={"20px"}
          textAlign={"center"}
          fontWeight={600}
          fontSize={25}
        >
          ALL RECIPES
        </Text>
        <RecipeGrid recipes={recipes} setRecipes={setRecipes} />
        {/* Render RecipeGrid with filteredRecipes */}
      </Container>
    </Stack>
  );
}

export default App;
