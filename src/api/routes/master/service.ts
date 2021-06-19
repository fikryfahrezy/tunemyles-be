import type CustModelType from '../../types/model';
import type {
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  UpdateBankLogoBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  PostMediaBody,
  PostWalletBody,
  UpdateWalletBody,
  UpdateWalletLogoBody,
  PostFaqBody,
  UpdateFaqBody,
} from '../../types/schema';
import { saveFiles } from '../../utils/file-management';
import {
  createBank,
  createMedia,
  getBanks,
  getBank,
  getBankUtilitiesByBankId,
  getBankAccountsByBankId,
} from '../../repositories/MasterRepository';

export const postBank: (data: PostBankBody) => Promise<void> = async function postBank({
  logo,
  bank_name,
}) {
  if (logo) {
    const { id } = await createMedia(logo[0].filename);
    await Promise.all([createBank({ bank_name, logoId: id }), saveFiles(logo)]);
  } else {
    await createBank({ bank_name });
  }
};

export const getBankData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getBankData(query) {
  const result = await getBanks(query);

  return result;
};

export const getSingleBank: (bankId: string) => Promise<unknown> = async function getSingleBank(
  bankId,
) {
  const bank = await getBank(bankId);
  const { id } = bank;
  const [bankUtilities, bankAccounts] = await Promise.all([
    getBankUtilitiesByBankId(id),
    getBankAccountsByBankId(id),
  ]);

  return {
    ...bank,
    steps: bankUtilities,
    accounts: bankAccounts,
  };
};
