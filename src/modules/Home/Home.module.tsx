import HomeHeader from "./components/HomeHeader/HomeHeader";
import MainHomeCart from "./components/MainHomeCart/MainHomeCart";
import MainHome from "./components/MainHome/MainHome";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import { Fragment } from "react/jsx-runtime";

const HomeModule = () => {
  return (
    <Fragment>
      <HomeHeader />
      <MainHomeCart />
      <MainHome />
      <HomeFooter />
    </Fragment>
  );
};

export default HomeModule;
