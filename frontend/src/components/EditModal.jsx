import {
  Avatar,
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({ setRecipes, recipe }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: recipe.name,
    role: recipe.role,
    description: recipe.description,
    category: recipe.category,
    imgUrl: recipe.imgUrl,
  });
  const toast = useToast();

  const handleEditRecipe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/recipes/" + recipe.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setRecipes((prevRecipes) =>
        prevRecipes.map((u) => (u.id === recipe.id ? data : u))
      );
      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Recipe updated successfully.",
        duration: 2000,
        position: "top-center",
      });
      onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "An error occurred.",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getImgUrl = (category) => {
    switch (category) {
      case "Breakfast":
        return "frontend/public/images/breakfast.png";

      case "Lunch":
        return "frontend/public/images/lunch.png";

      case "Dinner":
        return "frontend/public/images/dinner.png";

      case "Snack":
        return "frontend/public/images/snack.png";

      case "Dessert":
        return "frontend/public/images/dessert.png";

      case "Other":
        return "frontend/public/images/other.png";

      default:
        return ""; // Default fallback
    }
  };

  function DropdownMenu({ selectedCategory, onChange }) {
    return (
      <Box>
        <Select
          value={inputs.category}
          onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
          placeholder="Select category"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Other">Other</option>
        </Select>
      </Box>
    );
  }
  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="blue"
        aria-label="See menu"
        size={"sm"}
        icon={<BiEditAlt size={20} />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditRecipe}>
          <ModalContent>
            <ModalHeader>My New Recipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Banana Bread"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <DropdownMenu value={inputs.category} />
                  {/* <p>Selected category: {inputs.category}</p> */}
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder={"1 cup of flour\n2 eggs\nPinch of salt"}
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="link"
                  value={inputs.role}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, role: e.target.value }))
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
export default EditModal;
