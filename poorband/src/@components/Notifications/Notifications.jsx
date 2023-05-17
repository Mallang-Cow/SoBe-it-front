import React from "react";
import NotificationCard from "./NotificationCard";

export default function Notifications() {
  return (
    <>
      <div>Notifications</div>
      {/* 전체 삭제 버튼 */}
      {/* 알림 전체 불러오기 */}
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </>
  );
}
