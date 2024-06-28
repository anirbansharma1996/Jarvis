import {
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Image,
} from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GOOGLE_API_CLIENT_ID } from "../utils/google.auth";
import logo from "../assets/jarvis-gemini.jpg";

export default function Auth() {
  const { loading, handleLoginSuccess, handleLoginError } =
    useContext(AuthContext);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w={["85%"]}
      m={"auto"}
    >
      {loading && (
        <Stack position={"relative"}>
          <Image
            src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            alt="loading"
            w={500}
            m={"auto"}
          />
          <Text
            position={"absolute"}
            left={["44%", "43%", "43%"]}
            top={["60%"]}
            fontSize={["xs", "xl"]}
          >
            Loading...
          </Text>
        </Stack>
      )}
      {!loading && (
        <Stack direction="column" >
          <Image w={['100%','50%',"20%"]} m={'auto'} src={logo} borderRadius={1000} />
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            m={'auto'}
            mt={10}
          >
            <Text textAlign={"center"} as="b" fontSize={"3xl"}>
              WELCOME TO JARVIS
            </Text>
            <Box w={220} m={"auto"}>
              <GoogleOAuthProvider clientId={GOOGLE_API_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                />
              </GoogleOAuthProvider>
            </Box>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
}
