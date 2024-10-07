import { useEffect, useMemo, useState } from "react";

import image1 from "@/assets/images/01.jpg";
import image2 from "@/assets/images/02.jpg";
import image3 from "@/assets/images/03.jpg";
import image4 from "@/assets/images/04.jpg";

function useTimeAndImage() {
  const [time, setTime] = useState<Date>(new Date());

  const currentImage = useMemo(() => {
    const hours = time.getHours();
    if (hours >= 0 && hours < 6)
      return image1;
    if (hours >= 6 && hours < 12)
      return image2;
    if (hours >= 12 && hours < 18)
      return image3;
    return image4;
  }, [time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return { time, currentImage };
}

export default useTimeAndImage;
