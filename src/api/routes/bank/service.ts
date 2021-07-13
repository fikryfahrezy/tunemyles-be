import type CustModelType from '../../types/model';
import type { PostBankUserBody, UpdateBankUserBody } from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import {
  createBankUser,
  updateBankUser,
  deleteBankUser,
  getBank,
  getBanks,
  getBankUtilitiesByBankId,
  getBankAccountsByBankId,
  getBankUsers,
} from '../../repositories/BankRepository';

export const getBankData: () => Promise<unknown> = async function getBankData() {
  const banks = await getBanks();

  if (banks.length === 0) return [];

  const accounts = await Promise.all(banks.map(({ id }) => getBankAccountsByBankId(id)));
  const resData = banks.map((bank, i) => {
    const newBank = bank;
    newBank.accounts = accounts[i];

    return newBank;
  });

  return resData;
};

export const getBankDetailData: (
  bankId: number,
) => Promise<unknown> = async function getBankDetailData(bankId) {
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse('bank not found', 404);

  const utilities = await getBankUtilitiesByBankId(bank.id);

  return {
    ...bank,
    steps: utilities,
  };
};

export const addUserBank: (
  userId: CustModelType['UserToken']['userId'],
  data: PostBankUserBody,
) => Promise<void> = async function addBankUser(userId, data) {
  const { bank_id: bankId } = data;
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse('bank not found', 404);

  await createBankUser(userId, data);
};

export const getUserBankData: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getBankUserData(userId) {
  const resData = await getBankUsers(userId);

  return resData;
};

export const updateUserBank: (
  userBankId: number,
  userId: CustModelType['UserToken']['userId'],
  data: UpdateBankUserBody,
) => Promise<void> = async function getBankUserData(userBankId, userId, data) {
  const [affectedRows] = await updateBankUser(userBankId, userId, data);

  if (affectedRows < 1) throw new ErrorResponse('bank account not found', 404);
};

export const deleteUserBank: (
  userBankId: number,
  userId: CustModelType['UserToken']['utilId'],
) => Promise<void> = async function deleteUserBank(userBankId, userId) {
  const affectedRows = await deleteBankUser(userBankId, userId);

  if (affectedRows < 1) throw new ErrorResponse('bank account not found', 404);
};
