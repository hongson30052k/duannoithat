import { Fragment } from "react/jsx-runtime";
import Description from "./components/Description/Description";
import ProductList from "./components/Productlist/ProductList";

const Product = () => {
  return (
    <Fragment>
      <ProductList />
      <Description />
    </Fragment>
  );
};

export default Product;
