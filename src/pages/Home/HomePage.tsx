import { Fragment } from "react/jsx-runtime";
import Header from "../../components/Header/Header";
import HomeModule from "../../modules/Home/Home.module";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <HomeModule />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
