import { Box, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { GeminiContext } from "../context/ResponseContext";
import { AuthContext } from "../context/AuthContext";
import { Text, Image } from "@chakra-ui/react";
import logo from "../assets/jarvis-gemini.jpg";
import ReactMarkdown from "react-markdown";

const Output = () => {
  const { isLoading, error, output } = useContext(GeminiContext);
  const { user } = useContext(AuthContext);
  const removeMarkdown = (text) =>
    text?.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, "$1");
  const plainText = removeMarkdown(output?.answer);

  return (
    <Box m="auto" mt="1rem" w="90%">
      {error && (
        <Text color="red" fontSize="md">
          {error}
        </Text>
      )}
      {isLoading && (
        <Stack position={"relative"}>
          <Image
            src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            alt="loading"
            w={500}
            m={"auto"}
          />
          <Text
            display={["none", "block", "block"]}
            position={"absolute"}
            left={["40%", "43%", "46%"]}
            top={["60%"]}
            fontSize="xl"
          >
            Loading...
          </Text>
        </Stack>
      )}
      {output && (
        <Box>
          {output?.question && (
            <Stack py={1} borderRadius={10} direction="row" spacing={4}>
              <Image
                borderRadius="full"
                boxSize="30px"
                src={user?.picture}
                alt={user?.name}
              />
              <Text fontSize="lg" as="b"  >
                {output?.question}
              </Text>
            </Stack>
          )}
          <Stack direction="row" mt="1rem" spacing={4}>
            <Image borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
            <Box
              h="62vh"
              overflow="auto"
              w={"full"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "1px",
                },
              }}
            >
              <ReactMarkdown>{plainText}</ReactMarkdown>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Output;
