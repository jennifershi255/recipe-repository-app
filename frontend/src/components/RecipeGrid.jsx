import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";

import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const RecipeGrid = ({ recipes, setRecipes }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await fetch(BASE_URL + "/recipes");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipes();
  }, [setRecipes]);

  console.log(recipes);
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} setRecipes={setRecipes} />
        ))}
      </Grid>

      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!isLoading && recipes.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Empty stomach! 😣
            </Text>
            Add a recipe.
          </Text>
        </Flex>
      )}
    </>
  );
};
export default RecipeGrid;
