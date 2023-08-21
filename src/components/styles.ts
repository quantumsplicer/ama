import styled from "styled-components";

export const FileRootContainer = styled.div`
  width: 45%;
`;

export const FileButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
`;

export const FileButtonItem = styled.div`
  width: 30%;
`;

export const FileInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  border: solid 2px black;
  border-radius: 20px;
  min-height: 50vh;
  margin: 0 10px;
`;

export const FileItemWrapper = styled.div`
  padding: 20px;
`;

export const FolderItemRoot = styled.div`
  position: relative;
  width: fit-content;
  margin: 10px;
`;

export const FolderItemImage = styled.img`
  pading: 10px;
  height: 80px;
`;

export const FolderItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

export const FolderItemName = styled.div`
  pading: 10px;
`;

export const FolderItemInput = styled.input`
//   border: none;
  text-align: center;
  outline: none;
  width: 70px;
`;

export const FolderItemSelection = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 15px 0px 0px 0px;
`;
