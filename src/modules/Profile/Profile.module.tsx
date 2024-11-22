import { loadavg } from "os";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Profile = () => {
  const { loading } = useSelector((state: RootState) => state.userProductState);
  return (
    <div>
      <Header />
      {loading ? (
        <Box>
          <LinearProgress />
        </Box>
      ) : null}
      <ProfileContent />
      <Footer />
    </div>
  );
};

export default Profile;
