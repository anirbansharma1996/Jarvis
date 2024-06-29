import React, { useContext, Suspense } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { VscRunAbove } from "react-icons/vsc";
import Output from "./Output";
import { GeminiContext } from "../context/ResponseContext";

const Prompt = () => {
  const { handleOutput, handleQuery, isLoading, query } =
    useContext(GeminiContext);

  return (
    <Box position="relative">
      <FormControl
        position="fixed"
        bottom="2"
        bg="gray.50"
        zIndex={999}
        w={["90%", "94%", "79%"]}
      >
        <InputGroup size="lg" bg={useColorModeValue("white", "gray.700")}>
          <Input
            required
            placeholder="enter your question"
            size="lg"
            name="query"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            readOnly={isLoading}
          />
          <InputRightElement width="4.5rem">
            <Button
              bg="gray.500"
              color='white'
              size="md"
              _hover={{
                bg: "blue.400",
                color: "white",
              }}
              isLoading={isLoading}
              onClick={() => handleOutput(query)}
            >
              <VscRunAbove />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Suspense fallback={<div></div>}>
        <Output />
      </Suspense>
    </Box>
  );
};

export default Prompt;
