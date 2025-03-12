import React from "react";
import { hourglass } from "ldrs";

hourglass.register();

const Loading: React.FC = () => {
  return (
    <l-hourglass
      size="40"
      bg-opacity="0.1"
      speed="1.75"
      color="black"
    ></l-hourglass>
  );
};

export default Loading;
