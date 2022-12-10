import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  CurrencyField,
  TextareaField,
  TextField,
} from "../../../../components/Fields";
import { SubmitButton } from "../../../../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { addTransaction } from "../../../../services/TransactionService";
import DateTimeField from "../../../../components/Fields/DateTimeField";
import { DEFAULT_CURRENCY } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../../../utils/enums";
import SelectField from "../../../../components/Fields/SelectField";
import { useStore } from "../../../../store";
import { fetchAccounts } from "../../../../services/AccountsService";
import { SelectableOption, ValidationErrorBag } from "../../../../utils/types";

const RegisterTransaction = () => {
  const { accountList, setAccountList } = useStore((state) => ({
    accountList: state.accountList,
    setAccountList: state.setAccountList,
  }));
  const [selectableAccounts, setSelectableAccounts] = useState<
    SelectableOption[]
  >([]);
  const [subject, setSubject] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState({
    amount: 0,
    currency: DEFAULT_CURRENCY,
  });
  const [description, setDescription] = useState("");
  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [targetAccountId, setTargetAccountId] = useState("");
  const [validSourceAccounts, setValidSourceAccounts] = useState<
    SelectableOption[]
  >([]);
  const [validTargetAccounts, setValidTargetAccounts] = useState<
    SelectableOption[]
  >([]);
  const [when, setWhen] = useState(now);
  const [transactionType, setTransactioType] = useState("");
  const [errorData, setErrorData] = useState<ValidationErrorBag | undefined>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = () => {
    if (transactionType === TransactionType.Income) {
      return !!(
        subject &&
        currencyAmount.amount &&
        currencyAmount.currency &&
        when &&
        targetAccountId
      );
    } else if (transactionType === TransactionType.Expense) {
      return !!(
        subject &&
        currencyAmount.amount &&
        currencyAmount.currency &&
        when &&
        sourceAccountId
      );
    } else if (transactionType === TransactionType.Transfer) {
      return !!(
        subject &&
        currencyAmount.amount &&
        currencyAmount.currency &&
        when &&
        sourceAccountId &&
        targetAccountId
      );
    }
    return false;
  };
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    if (!validate()) return;

    const resp = await addTransaction({
      subject,
      description,
      amount: currencyAmount.amount,
      currency: currencyAmount.currency,
      when: dayjs(when).format("YYYY-MM-DDTHH:mm:ss"),
      type: transactionType,
      from_account_id: sourceAccountId || undefined,
      to_account_id: targetAccountId || undefined,
    });
    if (resp.status === 201) {
      navigate("..");
      return;
    }
    if (resp.data.errors) {
      setErrorData(resp.data);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const handleTransactionTypeChange = (value) => {
    setTransactioType(value);
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleAmountChange = (value) => {
    if (isNaN(value.amount)) {
      setCurrencyAmount({
        amount: 0,
        currency: DEFAULT_CURRENCY,
      });
    } else {
      setCurrencyAmount(value);
    }
  };

  const handleDescChange = (value) => {
    setDescription(value);
  };

  const handleWhenChange = (value) => {
    setWhen(value);
  };

  const handleSourceAccountIdChange = (value) => {
    setSourceAccountId(value);
  };
  const handleTargetAccountIdChange = (value) => {
    setTargetAccountId(value);
  };

  useEffect(() => {
    fetchAccounts({}).then((accountsRes) => {
      setAccountList(accountsRes);
    });
  }, []);

  useEffect(() => {
    const accountsForSelect: SelectableOption[] = accountList?.data?.map(
      (a) => ({
        id: a.id as string,
        label: a.title + " - " + a.provider_name,
      })
    );
    setSelectableAccounts(accountsForSelect);
  }, [accountList]);

  useEffect(() => {
    setValidTargetAccounts(
      selectableAccounts?.filter((sa) => sa.id !== sourceAccountId)
    );
  }, [selectableAccounts, sourceAccountId]);

  useEffect(() => {
    setValidSourceAccounts(
      selectableAccounts?.filter((sa) => sa.id !== targetAccountId)
    );
  }, [selectableAccounts, targetAccountId]);

  useEffect(() => {
    setIsValid(validate());
  }, [
    transactionType,
    subject,
    description,
    sourceAccountId,
    targetAccountId,
    currencyAmount?.amount,
    currencyAmount?.currency,
  ]);

  return (
    <div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <SelectField
          value={transactionType}
          label={t("fields.transactionType") + ":"}
          options={Object.keys(TransactionType).map((key) => ({
            label: t(key.toLowerCase()),
            id: TransactionType[key],
          }))}
          onChange={handleTransactionTypeChange}
          id="transaction_type"
          withDefault={"-- " + t("selectTransactionType").toUpperCase()}
          errors={errorData?.errors?.type}
        />
        {transactionType && (
          <>
            <TextField
              id="subject"
              label={"* " + t("fields.subject") + ":"}
              value={subject}
              onChange={handleSubjectChange}
              errors={errorData?.errors?.subject}
            />
            <CurrencyField
              id="amount"
              value={currencyAmount}
              label={"* " + t("fields.amount") + ":"}
              onChange={handleAmountChange}
              invalidNumberError={t("invalidNumberError")}
              errors={errorData?.errors?.currency}
            />
            {transactionType !== TransactionType.Income && (
              <SelectField
                value={sourceAccountId}
                label={"* " + t("fields.sourceAccount") + ":"}
                options={validSourceAccounts}
                onChange={handleSourceAccountIdChange}
                id="source_account"
                withDefault={"-- " + t("selectAccount").toUpperCase()}
                errors={errorData?.errors?.to_account_id}
              />
            )}
            {transactionType !== TransactionType.Expense && (
              <SelectField
                value={targetAccountId}
                label={"* " + t("fields.targetAccount") + ":"}
                options={validTargetAccounts}
                onChange={handleTargetAccountIdChange}
                id="target_account"
                withDefault={"-- " + t("selectAccount").toUpperCase()}
                errors={errorData?.errors?.from_account_id}
              />
            )}
            <DateTimeField
              id="when"
              value={when}
              label={"* " + t("fields.when") + ":"}
              onChange={handleWhenChange}
              errors={errorData?.errors?.when}
            />
            <TextareaField
              id="description"
              value={description}
              label={t("fields.description") + ":"}
              onChange={handleDescChange}
              errors={errorData?.errors?.description}
            />
          </>
        )}
        <div className="flex items-center space-x-4 pt-6">
          <SubmitButton
            disabled={!isValid}
            onClick={handleSubmit}
            label={t("register")}
          />
          <Link to={".."}>{t("cancel")}</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterTransaction;
