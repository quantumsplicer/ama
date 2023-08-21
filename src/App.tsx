import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FileContainer } from "./components/FileContainer";
import { useRecoilState } from "recoil";
import {
  ChangesType,
  FileItemType,
  System1Data,
  System2Data,
  SystemDataType,
} from "./data";

function App() {
  const [system1Data, setSystem1Data] = useRecoilState(System1Data);
  const [system2Data, setSystem2Data] = useRecoilState(System2Data);

  // all of the logic below is defined here and not in the other components kepping in mind the scalability of the project and the reusability of the components

  // in this function there is only use of the timeStamp array from the 'toSystem'
  const createChangeList = (
    fromData: SystemDataType,
    toData: SystemDataType
  ) => {
    let changesList: ChangesType[] = [];
    fromData.timeStamp?.map((item, index) => {
      console.log(item, index, fromData.data);
      if (item == "-1") {
        changesList.push({
          id: index,
          changeType: "delete",
        });
      } else if (!toData.timeStamp?.[index]) {
        changesList.push({
          id: index,
          time: item,
          changeType: "add",
          newName: fromData.data?.[index].name,
        });
      } else if (item != toData.timeStamp?.[index]) {
        changesList.push({
          id: index,
          time: item,
          changeType: "rename",
          newName: fromData.data?.[index].name,
        });
      }
    });

    // remove excessive data from the 'toSystem'
    toData.timeStamp?.map((item, index)=>{
      if(fromData.timeStamp && index >= fromData.timeStamp?.length){
        changesList.push({
          id: index,
          changeType: "delete",
        });
      }
    })
    return changesList;
  };

  const updateData = (changesInfo: ChangesType[], data: SystemDataType) => {
    let updatedData = data.data ? [...data.data] : [];
    let updatedTimeStamp = data.timeStamp ? [...data.timeStamp] : [];
    changesInfo.forEach((item) => {
      switch (item.changeType) {
        case "delete":
          updatedTimeStamp[item.id] = "-1";
          updatedData[item.id] = {};
          break;
        case "add":
        case "rename":
          updatedTimeStamp[item.id] = item.time as string;
          updatedData[item.id] = {
            name: item.newName as string,
            rename: false,
            selectable: false,
          };
          break;
      }
    });
    return { data: updatedData, timeStamp: updatedTimeStamp };
  };

  const onSync = (fromData: SystemDataType, toData: SystemDataType) => {
    // to create the list of changes to be sent from the 'fromSystem' to the 'toSystem'
    const changesInfo = createChangeList(fromData, toData);
    console.log(changesInfo, "changes");

    // now the list of changes is sent from the 'fromSystem' to the 'toSystem
    // -> -> -> -> -> -> -> -> -> -> -> ->
    // when the 'toSystem' receies the Data it changes changes its data as mentioned
    const updatedData = updateData(changesInfo, toData);
    console.log(updatedData, "updatedData");
    return updatedData as SystemDataType;
  };

  const removeDeleted = (systemData: SystemDataType) => {
    let clearedData: SystemDataType = {}
    clearedData.timeStamp = systemData.timeStamp?.filter((item) => item != "-1");
    clearedData.data = systemData.data?.filter((item) => Object.keys(item).length > 0);
    return clearedData;
  };

  return (
    <div className="App">
      <FileContainer
        data={system1Data as SystemDataType}
        changeData={setSystem1Data as Dispatch<SetStateAction<SystemDataType>>}
      />
      <div className="ButtonContainer">
        <button
          onClick={() => {
            const newData: SystemDataType = onSync(system2Data, system1Data);
            setSystem1Data(removeDeleted(newData))
            
            // residual stuff could be managed inside the function but seperated for clarity of code here.
            setSystem2Data(removeDeleted(system2Data))
          }}
        >
          {"<- Sync S1 to S2"}
        </button>
        <button
          onClick={() => {
            const newData: SystemDataType = onSync(system1Data, system2Data);
            setSystem2Data(removeDeleted(newData))

            // residual stuff could be managed inside the function but seperated for clarity of code here.
            setSystem1Data(removeDeleted(system1Data))
          }}
        >
          {"Sync S2 to S1 ->"}
        </button>
      </div>
      <FileContainer
        data={system2Data as SystemDataType}
        changeData={setSystem2Data as Dispatch<SetStateAction<SystemDataType>>}
      />
    </div>
  );
}

export default App;
