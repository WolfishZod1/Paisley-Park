import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Squares from "../SquareBg/SquareBg";

const DynamicSvgStuff = dynamic(() => import("./SvgStuff"), {
  ssr: false,
  loading: () => <p>Секунду...</p>,
});

const MapWithSquares = () => {
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [reloadSquares, setReloadSquares] = useState(0);

  useEffect(() => {
    if (svgLoaded) {
      setReloadSquares((prev) => prev + 1); // пересоздаём Squares
    }
  }, [svgLoaded]);

  return (
    <>
      <DynamicSvgStuff onLoad={() => setSvgLoaded(true)} />

      <Squares
        key={reloadSquares}
        speed={0}
        squareSize={30}
        direction="down"
        borderColor="#afafafff"
      />
    </>
  );
};

export default MapWithSquares;
