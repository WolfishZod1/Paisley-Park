import { motion } from "framer-motion";
import { ReactElement, SVGProps } from "react";

interface IRegionProps {
  setRegion: (region: number) => void;
  selectedRegion: number;
  variants: {
    initial: {};
    animate: {};
  };
  region: number;
  className: string;
  children: ReactElement<SVGProps<SVGPathElement>>;
}

function Building(props: IRegionProps) {
  const { children, setRegion, variants, selectedRegion, region } = props;

  const { d, fill, stroke, strokeWidth, width, height, x, y, ...rest } =
    children.props;

  return (
    <motion.rect
      animate={{
        stroke: selectedRegion === region ? "purple" : "purple",
        strokeWidth: selectedRegion === region ? 3 : 0,
      }}
      variants={variants}
      initial="initial"
      whileHover="animate"
      whileTap="animate"
      onClick={() => setRegion(region)}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
    />
  );
}

export default Building;
