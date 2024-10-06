import image1 from "@/assets/images/01.jpg";
import { Footer } from "@/pages/MainPage/ui/footer/ui/footer";
import { Header } from "@/pages/MainPage/ui/header/ui/header";
import { MainContent } from "@/pages/MainPage/ui/main-content/ui/main-content";

import s from "./main-page.module.scss";

export function MainPage() {
  return (
    <div className={s.mainPage}>
      <img className={s.image} src={image1} alt="nature" />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
