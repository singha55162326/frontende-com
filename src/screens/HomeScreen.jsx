import React from "react";
import Header from "../components/Header";
import ShopSection from "../components/homeComponents/ShopSection";
// import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import Footer from "../components/Footer";
import { useParams } from "react-router";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const params = useParams();
  const keyword = params.keyword;
  const pagenumber = params.pagenumber;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      {/* <CalltoActionSection /> */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
