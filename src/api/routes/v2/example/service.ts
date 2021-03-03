import { exampleMultipleData, exampleSingleData } from "./model";
import type { DummyArrayDataType, DummyDataType } from "./model";

export const getService: () => DummyArrayDataType = () => {
  const data = exampleMultipleData();
  return data;
};

export const postService = (text: string) => {
  const isSuccess = typeof text === "string" && true;
  return isSuccess;
};

export const getIdService: (id: number) => DummyDataType | Error = (id) => {
  const data = exampleSingleData(id);
  if (!data) return new Error("404");
  return data;
};

export const postFileService = () => {
  const isSuccess = true;
  return isSuccess;
};
