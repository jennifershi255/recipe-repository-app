import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  Link,
  useToast,
  useColorMode,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const RecipeCard = ({ recipe, setRecipes }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const handleDeleteRecipe = async () => {
    try {
      const res = await fetch(BASE_URL + "/recipes/" + recipe.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setRecipes((prevRecipes) =>
        prevRecipes.filter((u) => u.id !== recipe.id)
      );
      toast({
        status: "success",
        title: "Success",
        description: "Recipe deleted successfully.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  const getImgUrl = (category) => {
    switch (category) {
      case "Breakfast":
        return "../images/breakfast.png";

      case "Lunch":
        return "../images/lunch.png";

      case "Dinner":
        return "../images/dinner.png";

      case "Snack":
        return "../images/snack.png";

      case "Dessert":
        return "../images/dessert.png";

      case "Other":
        return "../images/other.png";

      default:
        return ""; // Default fallback
    }
  };

  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Box>
              <Image src={getImgUrl(recipe.category)} boxSize="55px"></Image>
            </Box>
            <Box>
              <Heading size="md">{recipe.name}</Heading>
              <Link
                href={recipe.link}
                isExternal
                color={colorMode === "dark" ? "blue.300" : "blue.500"}
                textDecoration="underline"
                fontSize={"small"}
              >
                Link To Recipe
              </Link>
            </Box>
          </Flex>

          <Flex>
            <EditModal recipe={recipe} setRecipes={setRecipes} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteRecipe}
            />
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Text sx={{ whiteSpace: "pre-wrap" }}>{recipe.description}</Text>
      </CardBody>
    </Card>
  );
};
export default RecipeCard;
