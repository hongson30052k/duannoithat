import { menu } from "./DescriptionData";
import classNames from "classnames/bind";
import styles from "./Description.module.scss";
import { useState } from "react";
import TableDescription from "../TableDescription/TableDescripton";
import Specification from "../Specification/Specification";
import Transport from "../Transport/Transport";
const cx = classNames.bind(styles);
const Description = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onClickMenu = (index: number) => {
    setActiveIndex(activeIndex === index ? index : index);
  };
  return (
    <>
      <div className={cx("border")}></div>
      <div className={cx("description")}>
        {menu.map((item, index) => {
          return (
            <>
              <div className={cx("menu-list")}>
                <div
                  className={cx("menu")}
                  key={index}
                  style={
                    activeIndex === index
                      ? { backgroundColor: "#1abc9c", color: "white" }
                      : {}
                  }
                  onClick={() => onClickMenu(index)}
                >
                  {item.name}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className={cx("description-text")}>
        <div className={cx("text")}>
          {activeIndex === 0 ? <TableDescription /> : null}
          {activeIndex === 1 ? <Specification /> : null}
          {activeIndex === 2 ? <Transport /> : null}
        </div>
      </div>
    </>
  );
};

export default Description;
