import { Box, Heading, Grid, Image, Link, Button } from "@chakra-ui/react";
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

const SERIES_PER_PAGE = 100;

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
    speed: 2000,
    slidesToShow: 9,
    slidesToScroll: 9,
    
   
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
        Séries populaires
      </Heading>

      <Box width="90vw" mx={"auto"}>
        <Slider {...settings}>
          {currentSeries.map((series) => (
            <Box
              key={series.id}
              className="flex flex-col items-center justify-center"
            >
              <Link href={`/series/${series.id}`} textDecoration="none">
                <Image
                  src={series.images.poster || ""}
                  alt={series.title}
                  w="90%"
                  h="auto"
                  maxH="600px" // Ajustez la hauteur maximale selon vos besoins
                  borderRadius="md"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                  m={2}
                />
              </Link>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Homepage;
