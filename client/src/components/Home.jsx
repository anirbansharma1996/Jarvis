import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Image,
  Link,
  useToast,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import Prompt from "./Prompt";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/jarvis-gemini.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/base.url";
import { GeminiContext } from "../context/ResponseContext";
import ReactMarkdown from "react-markdown";

const SidebarContent = ({ onClose, ...rest }) => {
  const toast = useToast();
  const { user, token } = useContext(AuthContext);
  const { output } = useContext(GeminiContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/prompt/${user.id}`, {
          headers: { Authorization: token },
        });
        if (res.status == 200) {
          setQuestions((prev) => res.data);
        }
      } catch (error) {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    };
    fetchdata();
  }, [output]);

  return (
    <Box
      position={"relative"}
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <Image borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Jarvis
          </Text>
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        height={["100vh", "75vh", "74vh"]}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "1px",
          },
        }}
      >
        {questions?.reverse().map((el) => (
          <NavItem key={el._id} m="1" border="1px solid">
            <FaQuestionCircle />
            &nbsp;
            <BasicUsage props={el} />
          </NavItem>
        ))}
      </Box>
      <Box position={"absolute"} bottom={0} left={[150, 30]}>
        <Text fontSize="sm" p={2} textAlign={"center"}>
          Designed & Developed by
          <br />
          <Link
            isExternal
            href="https://www.linkedin.com/in/anirban-sharma1996/"
          >
            Anirban Sharma &copy; 2024
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { user, handleLogOut } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display={{ base: "flex", md: "none" }} gap={2}>
        <Image borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Jarvis
        </Text>
      </Box>

      <HStack spacing={{ base: "2", md: "6" }}>
        <Button onClick={toggleColorMode} bg={"transparent"}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user?.picture} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Prompt />
      </Box>
    </Box>
  );
};

export default Home;

export function BasicUsage({ props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text fontSize={["xl", "lg", "sm"]} onClick={onOpen}>
        {props.question}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  />
        <ModalContent >
          <ModalHeader>{props.question}</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="xs">
            <ReactMarkdown >{props.answer}</ReactMarkdown>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
