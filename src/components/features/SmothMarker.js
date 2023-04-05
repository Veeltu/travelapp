import React from "react";
import { animated, useSpring } from "react-spring";

const SmoothMarker = ({ targetCoordinates, nameOnMap }) => {
    const props = useSpring({
      transform: `translate(${targetCoordinates[0]}, ${targetCoordinates[1]})`,
      config: { mass: 2, tension: 4000, friction: 10000, velocity: 1, clamp: true },
      from: {
        transform: `translate(${targetCoordinates[0]}, ${
          targetCoordinates[1] - 10
        })`,
      },
    });

 
  return (
    <animated.div
    //   style={{
    //     ...style,
    //     ...animationProps,
    //   }}
    />
  );
};

export default SmoothMarker;
