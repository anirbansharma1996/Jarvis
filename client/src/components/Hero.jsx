import { Flex, Stack, Text, useColorModeValue, Box } from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Auth() {
  const { handleLoginSuccess, handleLoginError } = useContext(AuthContext);
 

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Text textAlign={"center"} as="b" fontSize={"3xl"}>
          WELCOME TO JARVIS
        </Text>
        <Box w={220} m={"auto"}>
          <GoogleOAuthProvider clientId="598500433116-k0sbgj4gb643mmbhqbo94m6lorafap9i.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </GoogleOAuthProvider>
        </Box>
      </Stack>
    </Flex>
  );
}
