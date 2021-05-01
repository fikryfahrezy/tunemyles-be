import type { DummyArrayDataType, DummyDataType } from './repository';
import type { AddedFileBody } from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import { exampleMultipleData, exampleSingleData } from './repository';
import { saveFiles } from '../../utils/file-management';

export const getService: () => DummyArrayDataType = () => {
  const data = exampleMultipleData();
  return data;
};

export const postService: (text: string) => boolean = (text: string) => {
  const isSuccess = typeof text === 'string' && true;
  return isSuccess;
};

export const getIdService: (id: number) => DummyDataType | Error = (id) => {
  const data = exampleSingleData(id);
  if (!data) throw new ErrorResponse(`data with id ${id} not found`, 404);
  return data;
};

export const postFileService: (files: AddedFileBody[]) => Promise<void> = async (
  files: AddedFileBody[],
) => {
  await saveFiles(files);
};
