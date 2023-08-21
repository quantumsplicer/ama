import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FileButtonContainer,
  FileButtonItem,
  FileInfoContainer,
  FileItemWrapper,
  FileRootContainer,
} from "./styles";
import { FolderItem } from "./FolderItem";
import { FileItemType, SystemDataType } from "../data";
import moment from "moment";

export type FileContainerProps = {
  data: SystemDataType;
  changeData: Dispatch<SetStateAction<SystemDataType>>;
};

export const FileContainer = (props: FileContainerProps) => {
  const { data, changeData } = props;

  const [localData, setLocalData] = useState<FileItemType[]>([]);
  const [buttonActive, setButtonActive] = useState<string>();
  const [selected, setSelected] = useState<number[]>([]);
  const [timeChange, setTimeChange] = useState<number[]>([]);

  const onChangeName = (id: number, name: string) => {
    setLocalData((prev) => {
      return prev.map((item, index) => {
        if (index == id) {
          return {
            ...item,
            name: name,
          };
        } else return { ...item };
      });
    });

    buttonActive === "rename" &&
      setTimeChange((prev) => {
        if (!timeChange.includes(id)) {
          return [...prev, id];
        } else {
          return prev;
        }
      });
  };

  const onSelection = (id: number, selection: string) => {
    setSelected((prev) => {
      if (selection === "false") {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const addButtonClick = () => {
    setButtonActive("add");
    setLocalData((prev) => {
      return [
        ...prev,
        {
          name: "",
          rename: true,
          selectable: false,
        },
      ];
    });
    setTimeChange((prev) => [...prev, localData.length]);
  };

  const renameButtonClick = () => {
    setButtonActive("rename");
    setLocalData((prevData) =>
      prevData.map((item) => {
        if (Object.keys(item).length > 0) {
          return {
            ...item,
            rename: true,
          };
        } else return {};
      })
    );
  };

  const deleteButtonClick = () => {
    setButtonActive("delete");
    setLocalData((prevData) =>
    prevData.map((item) => {
      if (Object.keys(item).length > 0) {
        return {
          ...item,
          selectable: true,
        };
      } else return {};
    })
    );
  };

  const saveButtonClick = () => {
    setButtonActive("");
    const newData = localData.map((item, index) => {
      if (Object.keys(item).length  == 0  || selected.includes(index)) {
        return {};
      } else {
        return {
          name: item.name,
          rename: false,
          selectable: false,
        };
      }
    });

    let timeData = data.timeStamp ? [...(data.timeStamp as string[])] : [];
    timeChange.forEach((item) => {
      switch (buttonActive) {
        case "add":
          timeData.push(moment().format("DD MM YYYY hh:mm:ss"));
          break;
        case "rename":
          timeData[item] = moment().format("DD MM YYYY hh:mm:ss");
          break;
      }
    });
    timeData = timeData.map((item, index) => {
      if (selected.includes(index)) return "-1" as string;
      else return item;
    });
    setTimeChange([]);
    setSelected([]);
    changeData({
      data: newData,
      timeStamp: timeData,
    });
  };

  useEffect(() => {
    console.log(data.data, "data");
    data.data && setLocalData(data.data as FileItemType[]);
  }, [data.data]);

  useEffect(() => {
    console.log(localData, "local");
  }, [localData]);

  return (
    <FileRootContainer>
      <FileButtonContainer>
        <FileButtonItem>
          {buttonActive && buttonActive == "add" ? (
            <button
              disabled={(buttonActive && buttonActive != "add") as boolean}
              onClick={saveButtonClick}
            >
              Save
            </button>
          ) : (
            <button
              disabled={(buttonActive && buttonActive != "add") as boolean}
              onClick={addButtonClick}
            >
              Add a File
            </button>
          )}
        </FileButtonItem>
        <FileButtonItem>
          {buttonActive && buttonActive == "rename" ? (
            <button
              disabled={(buttonActive && buttonActive != "rename") as boolean}
              onClick={saveButtonClick}
            >
              Save
            </button>
          ) : (
            <button
              disabled={(buttonActive && buttonActive != "rename") as boolean}
              onClick={renameButtonClick}
            >
              Rename Files
            </button>
          )}
        </FileButtonItem>
        <FileButtonItem>
          {buttonActive && buttonActive == "delete" ? (
            <button
              disabled={(buttonActive && buttonActive != "delete") as boolean}
              onClick={saveButtonClick}
            >
              Save
            </button>
          ) : (
            <button
              disabled={(buttonActive && buttonActive != "delete") as boolean}
              onClick={() => {
                deleteButtonClick();
              }}
            >
              Delete Files
            </button>
          )}
        </FileButtonItem>
      </FileButtonContainer>
      <FileInfoContainer>
        {localData &&
          localData.map((item, index) => {
            console.log(item);
            if (Object.keys(item).length > 0) {
              return (
                <FileItemWrapper>
                  <FolderItem
                    id={index}
                    {...item}
                    onChange={onChangeName}
                    onSelect={onSelection}
                  />
                </FileItemWrapper>
              );
            }
          })}
      </FileInfoContainer>
    </FileRootContainer>
  );
};
