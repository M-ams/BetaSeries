import {
  Box,
  Heading,
  Grid,
  Image,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Series {
  id: number;
  images: {
    show: string | null;
    poster: string | null;
  };
  title: string;
}

const SERIES_PER_PAGE = 10;

function SeriesWithNumber({
  series,
  index,
}: {
  series: Series;
  index: number;
}) {
  const right =
    index < 9 ? ["35%", "45%", "40%", "40%"] : ["44%", "40%", "40%", "40%"];
  const fontSize =
    index < 9
      ? ["40vw", "25vw", "20vw", "16vw"]
      : ["20vw", "17vw", "13vw", "11vw"];
  const bottom =
    index < 9 ? ["-20%", "-30%", "", "-40%"] : ["_20%", "", "", "-15%"];

  return (
    <Flex
      key={series.id}
      className="relative flex flex-row items-center justify-center"
      mt={"8vh"}
      mb={"8vh"}
    >
      <Box
        color="white"
        fontWeight="bold"
        fontSize={fontSize}
        zIndex={0}
        position="absolute"
        right={right}
        bottom={bottom}
        fontStyle={"bold"}
      >
        {index + 1}
      </Box>
      <Box position="relative" w="90%">
        <Link href={`/series/${series.id}`} textDecoration="none">
          <Image
            src={series.images.poster || ""}
            alt={series.title}
            w={["65%", "50%", "55%", "50%"]}
            h="auto"
            maxH="600px"
            borderRadius="md"
            marginLeft={"40%"}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s ease-in-out"
          />
        </Link>
      </Box>
    </Flex>
  );
}

function Homepage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // Remplacez "VOTRE_CLE_API" par votre clé d'API BetaSeries
        const apiKey = "f7ea5278f03f";
        const apiUrl = `https://api.betaseries.com/shows/list?order=popularity&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        // Met à jour le state avec la liste des séries
        setSeriesList(data.shows);
        console.log(data.shows);
      } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
      }
    };

    // Appelle la fonction de récupération des séries
    fetchSeries();
  }, []);

  const indexOfLastSeries = currentPage * SERIES_PER_PAGE;
  const indexOfFirstSeries = indexOfLastSeries - SERIES_PER_PAGE;
  const currentSeries = seriesList.slice(indexOfFirstSeries, indexOfLastSeries);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

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
        Trending
      </Heading>

      <Box width={["80vw", "80vw", "90vw", "90vw"]} m={"auto"} mt={"5vh"}>
        <Slider {...settings}>
          {currentSeries.map((series, index) => (
            <SeriesWithNumber key={series.id} series={series} index={index} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Homepage;
