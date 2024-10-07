import useTimeAndImage from "@/common/hooks/use-time-and-image";
import { Footer } from "@/pages/MainPage/ui/footer/ui/footer";
import { Header } from "@/pages/MainPage/ui/header/ui/header";
import { MainContent } from "@/pages/MainPage/ui/main-content/ui/main-content";

import s from "./main-page.module.scss";

export function MainPage() {
  const { time, currentImage } = useTimeAndImage();

  return (
    <div className={s.mainPage}>
      <img className={s.image} src={currentImage} alt="nature" />
      <div className={s.container}>
        <Header />
        <MainContent time={time} />
        <Footer />
      </div>
    </div>
  );
}
