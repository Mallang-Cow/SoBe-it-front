import React from "react";
import ConsumptionCalendar from "./ConsumptionCalendar";
import ConsumptionList from "../ConsumptionList";
import ConsumptionGraph from "../ConsumptionGraph";

export default function Statistics() {
  return (
    <>
      <div>Statistics</div>
      {/* 메뉴바 */}
      {/* 위에 메뉴바(?) 넣어서 누를 떄마다 안에 내용 바뀌기 */}
      <ConsumptionList />
      <ConsumptionGraph />
      <ConsumptionCalendar />
    </>
  );
}
