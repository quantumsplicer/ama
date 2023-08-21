import { Moment } from "moment";
import { atom } from "recoil";

export type FileItemType = {
    name?: string;
    rename?: boolean;
    selectable?: boolean;
} 

export type ChangesType = {
  id: number;
  time?: string; 
  changeType: string;
  newName?: string;
} 

export type SystemDataType = {
  data?: FileItemType[];
  timeStamp?: string[];
} 

export const System1Data = atom<SystemDataType>({
  key: "System1Data",
  default: {
    timeStamp: [],
    data: []
  },
});

export const System2Data = atom<SystemDataType>({
  key: "System2Data",
  default: {
    timeStamp: [],
    data: []
  },
});


