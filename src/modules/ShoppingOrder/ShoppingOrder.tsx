import React from "react";
import WithAuth from "../../hoc/WithAuth";
import ProfileShopping from "../Profile/components/ProfileShopping/ProfileShopping";

const ShoppingOrder = () => {
  return (
    <div>
      <ProfileShopping />
    </div>
  );
};

export default WithAuth(ShoppingOrder);
