import { exampleMultipleData, exampleSingleData } from "./model";
// import ErrorResponse from '../../../utils/ErrorResponse'

export const getService = () => {
  const data = exampleMultipleData();
  return data;
};

export const postService = () => {
  const isSuccess = true;
  return isSuccess;
};

export const getIdService = (id: number) => {
  const data = exampleSingleData(id);
  return data;
};

export const postFileService = () => {
  const isSuccess = true;
  return isSuccess;
};
