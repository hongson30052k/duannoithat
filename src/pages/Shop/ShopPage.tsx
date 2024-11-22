import { Fragment } from "react/jsx-runtime";
import Header from "../../components/Header/Header";
import Shop from "../../modules/Shop/Shop.module";
import Footer from "../../components/Footer/Footer";

const ShopPage = () => {
  return (
    <Fragment>
      <Header />
      <Shop />
      <Footer />
    </Fragment>
  );
};
export default ShopPage;
