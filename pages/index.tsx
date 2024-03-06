import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

const Homepage = dynamic(() => import("./homepage"), { ssr: false });
const BetaSeries = dynamic(() => import("./BetaSeries"), { ssr: false });

export default function Home() {
  const [showMams, setShowMams] = useState<boolean>(!!Cookies.get("animation"));

  useEffect(() => {
    if (!showMams) {
      const homepageImport = import("./homepage");
      const mamsImport = import("./BetaSeries");

      Promise.all([homepageImport, mamsImport]).then(() => {
        setTimeout(() => {
          setShowMams(true);
          Cookies.set("animation", "true", { expires: 1 / 288, path: "" });
        }, 2000);
      });
    }
  }, [showMams]);

  return <>{showMams ? <Homepage /> : <BetaSeries />}</>;
}
