"use client";

import { useState, useEffect } from "react";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Avatar,
  Text,
  Icon,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

import Link from "next/link";
import React from "react";
import { redirect } from "next/dist/server/api-utils";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [display, changeDisplay] = useState("none");
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    // Check if window is defined to ensure it's running on the client side
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken || "");
    }
  }, []);

  const removeToken = () => {
    setToken("");
    localStorage.removeItem("token");
    setRedirect(true);
  };
  const router = useRouter();

  if (redirect) {
    router.push("/login");
  }

  return (
    <Flex>
      <Flex
        position="fixed"
        paddingRight={10}
        align="center"
        bg="rgba(17,17,17,0.1)"
        className="backdrop-filter backdrop-blur-[8px]"
        w={["100vw", "100vw", "100vw", "100vw"]}
        zIndex={1}
      >
        <Flex alignItems={"center"}>
        </Flex>
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]} mr={"auto"} >
          <Link href="/">
            <Button
              bg="bg"
              _hover={{ bg: "brand.componentbghover" }}
              color="brand.text1"
              my={5}
              w="100%"
              size={"lg"}
              className="gg"
            >
              Accueil
            </Button>
          </Link>
          <Link href="/series/homeseries">
            <Button
              className="gg2"
              bg="bg"
              _hover={{ bg: "brand.componentbghover" }}
              color="brand.text1"
              my={5}
              w="100%"
              size={"lg"}
            >
              Series
            </Button>
          </Link>

          <Link href="/projects">
            <Button
              className="gg3"
              bg="bg"
              _hover={{ bg: "brand.componentbghover" }}
              color="brand.text1"
              my={5}
              w="100%"
              size={"lg"}
            >
              Films
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}

        <IconButton
          ml={"auto"}
          aria-label="Open Menu"
          size="lg"
          bg="rgba(17,17,17,0.1)"
          className="backdrop-filter backdrop-blur-[8px]"
          color={"brand.text2"}
          _hover={{ bg: "brand.componentbghover" }}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bg="brand.componentbg"
        zIndex={1}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex">
          <IconButton
            ml={"auto"}
            bg="brand.componentbg"
            color={"brand.text2"}
            _hover={{ bg: "brand.componentbghover" }}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
            role="button"
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link href="/" passHref>
            <Button
              _hover={{ bg: "brand.componentbghover" }}
              bg="brand.componentbg"
              color={"brand.text2"}
              aria-label="Home"
              my={5}
              w="100%"
            >
              Accueil
            </Button>
          </Link>

          <Link href="/about-me" passHref>
            <Button
              _hover={{ bg: "brand.componentbghover" }}
              bg="brand.componentbg"
              color={"brand.text2"}
              aria-label="About"
              my={5}
              w="100%"
            >
              Séries
            </Button>
          </Link>

          <Link href="/projects" passHref>
            <Button
              _hover={{ bg: "brand.componentbghover" }}
              bg="brand.componentbg"
              color={"brand.text2"}
              aria-label="About"
              my={5}
              w="100%"
            >
              Films
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Navbar;
