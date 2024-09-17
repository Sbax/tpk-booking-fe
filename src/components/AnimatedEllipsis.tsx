import { FC, useEffect, useState } from "react";

const AnimatedEllipsis: FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return <span>{dots}</span>;
};

export default AnimatedEllipsis;
