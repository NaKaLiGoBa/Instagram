import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // console.log(event.target);
      // 현재 modal div 안을 클릭하는지 밖을 클릭하는지 체크
      if (!ref.current || ref.current.contains(event.target)) {
        //ref.current: div.modal

        return;
        //아무 작업도 실행 되지 않음.
      }
      handler();
    };

    // 클릭을 할 때 함수를 호출할 수 있게 하기 위해서 이벤트 리스너 등록
    document.addEventListener("mousedown", listener);
    //listener 함수 호출

    // 1. component가 더 이상 안쓰일 때 호출
    // 2. setInterval setTimeout 을 clear 할 때 호출
    return () => {
      document.removeEventListener("mousedown", listener);
    };
    //컴포넌트 종료, 이벤트 리스너 제거
  }, [ref, handler]);
}
