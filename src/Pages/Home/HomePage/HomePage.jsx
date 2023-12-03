import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Partners from "../Partners/Partners";
import TopClasses from "../TopClasses/TopClasses";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>Class Crafters | Home</title>
      </Helmet>
      <Banner></Banner>
      <Partners></Partners>
      <TopClasses></TopClasses>
      <Feedback></Feedback>
      <Description></Description>
    </div>
  );
};

export default HomePage;
