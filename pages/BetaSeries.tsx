import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

function BetaSeries() {
  return (
    <Box
      className="min-h-screen items-center justify-center flex optima h-100"
      bg={"brand.bg"}
      h={"100vh"}
      color={"brand.text2"}
    >
      <Text
        className="fade-out1"
        fontSize={["8vw", "6vw", "5vw", "5vw"]}
        fontStyle={"bold"}
      >
        Beta
      </Text>
      <Text
        className="fade-out2"
        fontSize={["8vw", "6vw", "5vw", "5vw"]}
        fontStyle={"bold"}
        ml={"2vh"}
      >
        Series
      </Text>
    </Box>
  );
}

export default BetaSeries;
