import { Fragment } from "react/jsx-runtime";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Product from "../../modules/Product/Product.module";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProductPage = () => {
  const { loading } = useSelector((state: RootState) => state.cartProductState);
  return (
    <Fragment>
      <Header />
      <Box style={{ width: "100%", display: "block" }}>
        {loading && (
          <LinearProgress
            color="secondary"
            style={{ width: "100%", height: "5px" }}
          />
        )}
      </Box>
      <Product />
      <Footer />
    </Fragment>
  );
};

export default ProductPage;
