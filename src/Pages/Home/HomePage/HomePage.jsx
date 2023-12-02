import Banner from "../Banner/Banner";
import Feedback from "../Feedback/Feedback";
import Partners from "../Partners/Partners";
import TopClasses from "../TopClasses/TopClasses";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Banner></Banner>
      <Partners></Partners>
      <TopClasses></TopClasses>
      <Feedback></Feedback>
    </div>
  );
};

export default HomePage;
