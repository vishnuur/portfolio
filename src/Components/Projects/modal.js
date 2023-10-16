import React from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

const Index = ({
  selectedData,
  setselectedData,
  dataList,
  handleModalContainerClick,
}) => {
  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        <div className="modal-close-icon">
          <IoCloseCircleSharp onClick={(e) => handleModalContainerClick(e)} />
        </div>
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img src={selectedData?.image} alt={selectedData.name} />
          </div>
          <div className="blog-slider__content" style={{ textAlign: "left" }}>
            <div className="blog-slider__title">{selectedData.name}</div>
            <span className="blog-slider__code">
              <span className="modal-subhead" style={{ fontWeight: "600" }}>
                Technology Used
              </span>
              <br />
              {selectedData.techused?.map((res) => (
                <span className="modal-subcontent"> {res},</span>
              ))}
            </span>
            <span
              className="blog-slider__code modal-subhead"
              style={{ fontWeight: "600", paddingTop: "12px" }}
            >
              Role and Responsibilities
              <ul>
                {selectedData?.roles?.map((res) => (
                  <li
                    className="modal-subcontent"
                    style={{ fontWeight: "400" }}
                  >
                    {res}
                  </li>
                ))}
              </ul>
            </span>

            {window.innerWidth >= 768 && (
              <div className="arrow-dir left-arrow">
                <MdKeyboardArrowUp
                  fill={selectedData?.indexVal !== 0 ? "white" : "grey"}
                  onClick={() =>
                    selectedData?.indexVal !== 0 &&
                    setselectedData({
                      ...dataList[selectedData.indexVal - 1],
                      indexVal: selectedData.indexVal - 1,
                    })
                  }
                />
              </div>
            )}
            {window.innerWidth >= 768 && (
              <div className="arrow-dir right-arrow">
                <MdKeyboardArrowDown
                  fill={
                    selectedData?.indexVal !== dataList?.length - 1
                      ? "white"
                      : "grey"
                  }
                  onClick={() =>
                    selectedData?.indexVal !== dataList?.length - 1 &&
                    setselectedData({
                      ...dataList[selectedData.indexVal + 1],
                      indexVal: selectedData.indexVal + 1,
                    })
                  }
                />
              </div>
            )}

            {window.innerWidth < 768 && (
              <div className="arrow-dir left-arrow">
                <MdKeyboardArrowLeft
                  fill={selectedData?.indexVal !== 0 ? "white" : "grey"}
                  onClick={() =>
                    selectedData?.indexVal !== 0 &&
                    setselectedData({
                      ...dataList[selectedData.indexVal - 1],
                      indexVal: selectedData.indexVal - 1,
                    })
                  }
                />
              </div>
            )}
            {window.innerWidth < 768 && (
              <div className="arrow-dir right-arrow">
                <MdKeyboardArrowRight
                  fill={
                    selectedData?.indexVal !== dataList?.length - 1
                      ? "white"
                      : "grey"
                  }
                  onClick={() =>
                    selectedData?.indexVal !== dataList?.length - 1 &&
                    setselectedData({
                      ...dataList[selectedData.indexVal + 1],
                      indexVal: selectedData.indexVal + 1,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
        {/* Repeat the above structure for additional slides */}
      </div>
      <div className="blog-slider__pagination"></div>
    </div>
  );
};

export default Index;
