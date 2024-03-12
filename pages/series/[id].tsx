import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import axios from "axios";

function SeriesDetail() {
  const router = useRouter();
  const { id } = router.query;
  const apiKey = "f7ea5278f03f";
  const [serie, setSerie] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://api.betaseries.com/shows/display?id=${id}&key=${apiKey}`,
          {}
        )
        .then((response) => {
          console.log(response.data.show);
          setSerie(response.data.show);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des séries :", error);
        });
    }
  }, [id]);

  return (
    <Box className="min-h-screen flex flex-col optima" bg={"brand.bg"}>
      <Navbar />
      <Heading
        fontSize={{ base: "20px", md: "35px", lg: "50px", xl: "50px" }}
        color={"brand.text2"}
        as={"b"}
        mt={["10vh", "10vh", "15vh", "15vh"]}
        mx={"auto"}
        className="cssanimation sequence fadeInBottom"
      >
        {serie ? serie.title : "Chargement..."}
      </Heading>

      <Box
        className="flex flex-row flex-wrap justify-center"
        mt={"5vh"}
        border={"1px solid"}
        borderColor={"brand.border1"}
        borderRadius={"2xl"}
        h={"90vh"}
        w={"90vw"}
        mx={"auto"}
        bg={"brand.componentbg"}
      >
        <Flex
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            w={["90vw", "90vw", "40vw", "40vw"]}
            h={["40vh", "40vh", "90vh", "90vh"]}
            p={"2vh"}
            // border={"1px solid"}
            // borderColor={"brand.border1"}
            className="cssanimation sequence fadeInBottom"
          >
            <Image
              src={serie ? serie.images.poster : ""}
              alt={"Serie image"}
              w={"60%"}
              h={"auto"}
              mx={"auto"}
              borderRadius={"lg"}
              boxShadow={"xl"}
              mt={"3vh"}
            />
          </Box>

          <Box
            w={["90vw", "90vw", "40vw", "40vw"]}
            h={["40vh", "40vh", "90vh", "90vh"]}
            m={"auto"}
            p={"2vh"}
            // border={"1px solid"}
            // borderColor={"brand.border1"}
            className="cssanimation sequence fadeInBottom"
          >
            <Heading
              color={"brand.text2"}
              mt={"3vh"}
              fontSize={{ base: "15px", md: "18px", lg: "20px", xl: "20px" }}
            >
              {serie ? serie.creation : ""} - {serie ? serie.country : ""}{" "}
            </Heading>
            <Stack mt="6" spacing="2" direction="row" flexWrap="wrap">
              {serie
                ? (Object.values(serie.genres) as string[]).map(
                    (genre: string, index: number) => (
                      <Badge
                        bg={"brand.componentbgonclck"}
                        key={index}
                        fontSize="lg"
                        rounded={10}
                        paddingX={2}
                        paddingY={1}
                        w={"auto"}
                        color={"brand.text2"}
                        size={"md"}
                      >
                        {genre}
                      </Badge>
                    )
                  )
                : ""}
            </Stack>
            <Flex flexDirection={"column"}>
              <Box>
                <Stack mt="6" spacing="2" direction="row" flexWrap="wrap">
                  {serie
                    ? serie.platforms.svods.map(
                        (
                          svod: {
                            logo: any;
                            name: string;
                          },
                          index: number
                        ) => (
                          <Tag
                            bg={"brand.componentbgonclck"}
                            key={index}
                            fontSize="lg"
                            rounded={10}
                            paddingX={2}
                            paddingY={1}
                            w={"auto"}
                            color={"brand.text2"}
                            size={"md"}
                          >
                            <Flex flexDirection={"row"}>
                              <Image src={svod.logo} alt="" w={"2vw"} />
                              <TagLabel m={"auto"} ml={2}>
                                {svod.name}
                              </TagLabel>
                            </Flex>
                          </Tag>
                        )
                      )
                    : ""}
                </Stack>
              </Box>

              <Heading
                fontSize={{ base: "20px", md: "25px", lg: "30px", xl: "30px" }}
                color={"brand.text2"}
                as={"b"}
                mt={"3vh"}
              >
                Synopsis
              </Heading>
              <Text
                color={"brand.text2"}
                mt={"2vh"}
                fontSize={{ base: "15px", md: "18px", lg: "20px", xl: "20px" }}
                textAlign={"justify"}
              >
                {serie ? serie.description : "Chargement..."}
              </Text>
              <Text
                fontSize={{ base: "15px", md: "20px", lg: "25px", xl: "25px" }}
                color={"brand.text2"}
                mt={"3vh"}
              >
                Saisons : {serie ? serie.seasons_details[0].number : ""} -
                Episodes : {serie ? serie.seasons_details[0].episodes : ""}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default SeriesDetail;
