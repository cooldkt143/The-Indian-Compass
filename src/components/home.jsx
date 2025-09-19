import React, { useState, useEffect } from "react";
import Header from "../ui/Header";
import bgHome from "../image/bg_home_1.jpg";
import mobileViewBg from "../image/bg_home_mobile.jpg";

// Importing sections
import Main from "../section/main";
import SectionMap from "../section/sectionmap";
import SectionAIScanner from "../section/AIScannerSection";

function Home() {
  const [bgImage, setBgImage] = useState(bgHome);

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth < 768) {
        setBgImage(mobileViewBg);
      } else {
        setBgImage(bgHome);
      }
    };
    updateBg();
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Main bgImage={bgImage} />
      <SectionMap bgImage={bgImage}/>
      <SectionAIScanner bgImage={bgImage}/>
    </div>
  );
}

export default Home;
