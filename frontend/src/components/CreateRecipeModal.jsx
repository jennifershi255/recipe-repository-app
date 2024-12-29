import {
  Button,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";
import { BASE_URL } from "../App";

const CreateRecipeModal = ({ setRecipes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // controls visibility of modal
  const [isLoading, setIsLoading] = useState(false); // tracks whether the form submission is in progress
  const [inputs, setInputs] = useState({
    name: "",
    link: "",
    description: "",
    category: "",
  });

  const toast = useToast();

  // handles form submissions
  const handleCreateRecipe = async (e) => {
    e.preventDefault(); // prevent page refresh
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Recipe created successfully.",
        duration: 2000,
        position: "top-center",
      });
      onClose(); // closes modal
      setRecipes((prevRecipes) => [...prevRecipes, data]); // newly created recipe is added to existing recipes
    } catch (error) {
      toast({
        status: "error",
        title: "An error occurred.",
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      // clear form fields
      setInputs({
        name: "",
        link: "",
        description: "",
        category: "",
      });
    }
  };

  function DropdownMenu({ onChange }) {
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
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateRecipe}>
          <ModalContent>
            <ModalHeader>My New Recipe</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                {/* Left */}
                <FormControl>
                  <FormLabel>Recipe Name</FormLabel>
                  <Input
                    placeholder="Banana Bread"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>

                {/* Right */}
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <DropdownMenu value={inputs.category} />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  rows="8"
                  overflowY={"hidden"}
                  placeholder={"1 cup of flour\n2 eggs\nPinch of salt"}
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="http://"
                  value={inputs.link}
                  onChange={(e) =>
                    setInputs({ ...inputs, link: e.target.value })
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
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
