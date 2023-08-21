import React from "react";
import {
  FolderItemImage,
  FolderItemInfo,
  FolderItemInput,
  FolderItemName,
  FolderItemRoot,
  FolderItemSelection,
} from "./styles";

export type FolderItemProps = {
  id: number;
  name?: string;
  selectable?: boolean;
  rename?: boolean;
  onChange?: (id: number, name: string) => void;
  onSelect?: (id: number, selection: string) => void;
};

export const FolderItem = (props: FolderItemProps) => {
  const {
    id,
    name,
    selectable = false,
    rename = false,
    onChange,
    onSelect,
  } = props;
  return (
    <FolderItemRoot>
      {selectable && (
        <FolderItemSelection>
          <input
            type="checkbox"
            onChange={(e) => {
              onSelect && onSelect(id, e.target.value);
            }}
          ></input>
        </FolderItemSelection>
      )}
      <FolderItemInfo>
        <FolderItemImage src={require("../assets/folder.png")} />
        {rename ? (
          <FolderItemInput
            onChange={(e) => {
              onChange && onChange(id, e.target.value);
            }}
            value={name}
            autoFocus={rename}
          ></FolderItemInput>
        ) : (
          <FolderItemName>{name}</FolderItemName>
        )}
      </FolderItemInfo>
    </FolderItemRoot>
  );
};
