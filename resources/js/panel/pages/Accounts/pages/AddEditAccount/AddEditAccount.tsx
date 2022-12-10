import { useEffect, useState } from "react";
import {
  CurrencyField,
  TextareaField,
  TextField,
} from "../../../../components/Fields";
import { SubmitButton } from "../../../../components/Buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchAccountId,
  saveAccount,
} from "../../../../services/AccountsService";
import { DEFAULT_CURRENCY } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";
import SelectField from "../../../../components/Fields/SelectField";
import { useStore } from "../../../../store";
import { fetchProfile } from "../../../../services/ProfileService";
import { AccountType } from "../../../../utils/enums";
import { ValidationErrorBag } from "../../../../utils/types";

const AddEditAccount = () => {
  const { profileData, setProfileData } = useStore((state) => ({
    profileData: state.profileData,
    setProfileData: state.setProfileData,
  }));
  const params = useParams();
  const [title, setTitle] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState({
    amount: 0,
    currency: DEFAULT_CURRENCY,
  });
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [providerName, setProviderName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [selectableTeams, setSelectableTeams] = useState([]);
  const [errorData, setErrorData] = useState<ValidationErrorBag | undefined>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = () => {
    return !!(
      title &&
      providerName &&
      (currencyAmount.amount || currencyAmount.amount >= 0) &&
      currencyAmount.currency &&
      ownerId &&
      accountType
    );
  };
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    if (!validate()) return;

    const resp = await saveAccount({
      id: params.accountId ?? undefined,
      title,
      description,
      amount: currencyAmount.amount,
      currency: currencyAmount.currency,
      owner_id: ownerId,
      provider_name: providerName,
      type: accountType,
    });
    if (resp.status >= 200 && resp.status < 300) {
      navigate("..", { replace: true });
      return;
    } else {
      setErrorData(resp.data);
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleProviderNameChange = (value) => {
    setProviderName(value);
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

  const handleAccountTypeChange = (value) => {
    setAccountType(value);
  };

  const handleOwnerIdChange = (value) => {
    setOwnerId(value);
  };

  useEffect(() => {
    if (!params.accountId) return;
    fetchAccountId(params.accountId).then(({ data }) => {
      setAccountType(data.type);
      setTitle(data.title);
      setOwnerId(data.owner_id);
      setCurrencyAmount({
        amount: data.amount,
        currency: data.currency,
      });
      setProviderName(data.provider_name);
      setDescription(data.description || "");
    });
  }, [params]);

  useEffect(() => {
    fetchProfile().then((resp) => {
      setProfileData(resp.data);
    });
  }, []);

  useEffect(() => {
    if (!profileData?.data?.allTeams) return;
    const options = profileData.data.allTeams.map((t) => ({
      label: t.name,
      id: t.id,
    }));
    setSelectableTeams(options);
  }, [profileData]);

  useEffect(() => {
    setIsValid(validate());
  }, [title, providerName, currencyAmount, ownerId, accountType]);

  return (
    <div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <TextField
          id="title"
          label={"* " + t("fields.title") + ":"}
          value={title}
          onChange={handleTitleChange}
          errors={errorData?.errors?.title}
        />
        <TextField
          id="provider"
          label={"* " + t("fields.providerName") + ":"}
          value={providerName}
          onChange={handleProviderNameChange}
          errors={errorData?.errors?.provider_name}
        />
        <CurrencyField
          id="amount"
          value={currencyAmount}
          label={"* " + t("fields.amount") + ":"}
          onChange={handleAmountChange}
          invalidNumberError={t("invalidNumberError")}
          errors={errorData?.errors?.amount}
        />
        <SelectField
          value={accountType}
          label={"* " + t("fields.accountType") + ":"}
          options={Object.keys(AccountType).map((key) => ({
            label: t(AccountType[key]),
            id: AccountType[key],
          }))}
          onChange={handleAccountTypeChange}
          id="account_type"
          withDefault={"-- " + t("selectAccount").toUpperCase()}
          errors={errorData?.errors?.type}
        />
        <SelectField
          value={ownerId}
          label={"* " + t("fields.owner") + ":"}
          options={selectableTeams}
          onChange={handleOwnerIdChange}
          id="owner_id"
          withDefault={"-- " + t("selectOwner").toUpperCase()}
          errors={errorData?.errors?.owner_id}
        />
        <TextareaField
          id="description"
          value={description}
          label={t("fields.description") + ":"}
          onChange={handleDescChange}
          errors={errorData?.errors?.description}
        />
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

export default AddEditAccount;
