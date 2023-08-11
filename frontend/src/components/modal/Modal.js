import React, { useRef } from "react";
import "./Modal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Modal = ({ setIsModalOpen }) => {
  const ref = useRef(null);
  //모달 요소 참조 생성
  //ref.current : div.modal

  console.log("ref", ref);
  //렌더링 확인

  console.log(document?.querySelector(".modal"));
  // 옵셔널 체이닝 , null or undefined 면 메서드
  // 호출이 에러 없이 undefined 반환.

  useOnClickOutside(ref, () => setIsModalOpen(false));
  //모달 외부 클릭 감지, setIsModalOpen(false)호출

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div
          className="modal"
          ref={ref}
          style={{ height: 280 }}
          // event.target 클릭하는 해당 요소를 반환

          onClick={(e) => console.log(e.target)}
        >
          <div className="modal__content">
            <div className="title">프로필 사진 바꾸기</div>
            <div className="divider"></div>
            <div className="buttons-wrapper">
              <div className="button-container">
                <button style={{ color: "#C4302B", fontWeight: "bold" }}>
                  사진 업로드
                </button>
              </div>
              <div className="divider"></div>
              <div className="button-container">
                <button style={{ color: "#3359CC", fontWeight: "bold" }}>
                  현재 사진 삭제
                </button>
              </div>
              <div className="divider"></div>
              <div className="button-container">
                <button
                  style={{ fontWeight: "bold" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
