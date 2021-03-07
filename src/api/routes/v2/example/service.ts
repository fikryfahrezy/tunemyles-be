import pmp from "pump";
import stream from "stream";
import util from "util";
import fs from "fs";
import { exampleMultipleData, exampleSingleData } from "./model";
import ErrorResponse from "../../../utils/error-esponse";
import type { DummyArrayDataType, DummyDataType } from "./model";
import type { AddedFileBody } from "../../../types";

const pump = util.promisify(pmp) as (
  ...streams: Array<pmp.Stream | pmp.Callback>
) => Promise<void>;

export const getService: () => DummyArrayDataType = () => {
  const data = exampleMultipleData();
  return data;
};

export const postService: (text: string) => boolean = (text: string) => {
  const isSuccess = typeof text === "string" && true;
  return isSuccess;
};

export const getIdService: (id: number) => DummyDataType | Error = (id) => {
  const data = exampleSingleData(id);
  if (!data) throw new ErrorResponse(`data with id ${id} not found`, 404);
  return data;
};

export const postFileService: (files: AddedFileBody[]) => void = async (
  files: AddedFileBody[]
) => {
  await Promise.all(
    files.map(({ filename, data }) => {
      const destFile = `./public/image/${filename}`;
      const streamFile = stream.Readable.from(data);
      const dest = fs.createWriteStream(destFile);
      return pump(streamFile, dest);
    })
  );
};
