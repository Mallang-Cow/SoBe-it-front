import { atom } from "recoil";

export const prevPageState = atom({
  key: "prevPageState",
  default: "home",
});

export const prevPageProfile = atom({
  key: "prevPageProfile",
  default: "profile",
});
