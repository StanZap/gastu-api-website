import ComboBox from "../../../../components/ComboBox";
import { TextareaField, TextField } from "../../../../components/Fields";
import { useTranslation } from "react-i18next";
import SelectField from "../../../../components/Fields/SelectField";
import { useEffect, useState } from "react";
import { updateTransaction } from "../../../../services/TransactionService";
import { SelectableOption, ValidationErrorBag } from "../../../../utils/types";
import DateTimeField from "../../../../components/Fields/DateTimeField";
import { useStore } from "../../../../store";
import { Account, StoreState } from "../../../../store/useStore";
import { currencySymbols, TransactionType } from "../../../../utils/enums";
import { fetchAccounts } from "../../../../services/AccountsService";
import AmountField from "../../../../components/Fields/AmountField/AmountField";

enum FieldTypesEnum {
    SUBJECT = "subject",
    AMOUNT = "amount",
    CURRENCY = "currency",
    DESCRIPTION = "description",
    ACCOUNT = "account_id",
    TEAM = "team_id",
    WHEN = "when",
    TYPE = "type",
}

const currencyOptions: SelectableOption[] = Object.keys(currencySymbols).map(
    (key) => ({
        label: key,
        id: key,
    })
);

const TransactionEdit = ({
    transactionId: id,
    field,
    value: prevValue,
    onSuccess,
}) => {
    const { t } = useTranslation();
    const oldValue = prevValue?.toString() ?? "";
    const [value, setValue] = useState(prevValue);
    const [errorData, setErrorData] = useState<ValidationErrorBag>();
    const { teams } = useStore((state: StoreState) => ({
        teams: state.profileData.allTeams || [],
    }));
    const [options, setOptions] = useState([]);

    const handleChange = (value) => {
        setValue(value);
    };

    const handleSave = async () => {
        try {
            await updateTransaction(id, {
                [field]: value,
            });
            onSuccess && onSuccess();
        } catch (e) {
            setErrorData(e);
        }
    };

    const getAccounts = async () => {
        try {
            const res = await fetchAccounts();
            return (
                res?.data?.map((acc: Account) => {
                    return {
                        id: acc.id,
                        label: acc.title + ", " + acc.provider_name,
                    };
                }) || []
            );
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const getOldValue: string = () => {
        if (
            field === FieldTypesEnum.ACCOUNT ||
            field == FieldTypesEnum.TEAM ||
            field == FieldTypesEnum.TYPE
        ) {
            return options?.find((opt) => opt.id == oldValue)?.label || "";
        }
        return oldValue;
    };

    useEffect(() => {
        if (!t || !field) return;
        if (field === FieldTypesEnum.ACCOUNT) {
            getAccounts().then((accountOptions) => {
                setOptions(accountOptions);
            });
        } else if (field === FieldTypesEnum.TEAM) {
            const _options = teams.map((team) => {
                return { id: team.id, label: team.name };
            });
            setOptions(_options);
        } else if (field === FieldTypesEnum.TYPE) {
            const _options = Object.values(TransactionType).map((val) => ({
                id: val,
                label: t(val),
            }));
            setOptions(_options);
        }
    }, [field, t]);

    return (
        <div className="py-10 space-y-4 min-h-[400px] px-8 min-w-[400px]">
            <div className="flex flex-col space-y-5">
                <h4 className="text-xl">
                    {`${t("edit")} ${t("fields." + field)}`}
                </h4>
                {field === FieldTypesEnum.SUBJECT && (
                    <TextField
                        id="subject"
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        value={value}
                        onChange={handleChange}
                        errors={errorData?.subject}
                    />
                )}
                {field === FieldTypesEnum.AMOUNT && (
                    <AmountField
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        id="amount"
                        value={value}
                        onChange={handleChange}
                        errors={errorData?.amount}
                    />
                )}
                {field === FieldTypesEnum.CURRENCY && (
                    <SelectField
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        id="currency"
                        value={value}
                        options={currencyOptions}
                        onChange={handleChange}
                        errors={errorData?.currency}
                    />
                )}
                {options && field === FieldTypesEnum.ACCOUNT && (
                    <ComboBox
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        options={options}
                        onChange={handleChange}
                        value={value}
                        errors={errorData?.account_id}
                    />
                )}

                {options && field === FieldTypesEnum.TEAM && (
                    <ComboBox
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        options={options}
                        onChange={handleChange}
                        value={value}
                        errors={errorData?.team_id}
                    />
                )}

                {field === FieldTypesEnum.WHEN && (
                    <DateTimeField
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        type={"date"}
                        id="when"
                        value={value}
                        onChange={handleChange}
                        errors={errorData?.when}
                    />
                )}

                {field === FieldTypesEnum.TYPE && (
                    <SelectField
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        id="type"
                        value={value}
                        options={options}
                        onChange={handleChange}
                        errors={errorData?.type}
                    />
                )}

                {field === FieldTypesEnum.DESCRIPTION && (
                    <TextareaField
                        label={`${t("currentValue")}: ${getOldValue()}`}
                        id="description"
                        value={value}
                        onChange={handleChange}
                        errors={errorData?.description}
                    />
                )}

                <div>
                    <button
                        type="button"
                        className="h-9 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={handleSave}
                    >
                        {t("saveButton")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionEdit;
