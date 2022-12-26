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
    const { accountList, setAccountList, teams } = useStore((state) => ({
        accountList: state.accountList,
        setAccountList: state.setAccountList,
        teams: state.profileData?.allTeams || [],
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
    const [accountId, setAccountId] = useState("");
    const [validAccounts, setValidAccounts] = useState<SelectableOption[]>([]);
    const [when, setWhen] = useState(now);
    const [transactionType, setTransactioType] = useState("");
    const [teamId, setTeamId] = useState("");
    const [errorData, setErrorData] = useState<
        ValidationErrorBag | undefined
    >();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const validate = () => {
        return !!(
            subject &&
            currencyAmount.amount &&
            currencyAmount.currency &&
            when &&
            accountId &&
            teamId
        );
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
            account_id: accountId || undefined,
            team_id: +teamId ?? undefined,
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

    const handleTeamChange = (value) => {
        setTeamId(value);
    };

    const handleAccountIdChange = (value) => {
        setAccountId(value);
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
        setValidAccounts(
            selectableAccounts?.filter((sa) => sa.id !== accountId)
        );
    }, [selectableAccounts, accountId]);

    useEffect(() => {
        setIsValid(validate());
    }, [
        transactionType,
        subject,
        description,
        accountId,
        currencyAmount?.amount,
        currencyAmount?.currency,
        teamId,
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
                    withDefault={
                        "-- " + t("selectTransactionType").toUpperCase()
                    }
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
                        <SelectField
                            value={accountId}
                            label={"* " + t("fields.account") + ":"}
                            options={validAccounts}
                            onChange={handleAccountIdChange}
                            id="account"
                            withDefault={
                                "-- " + t("selectAccount").toUpperCase()
                            }
                            errors={errorData?.errors?.account_id}
                        />
                        <SelectField
                            value={teamId}
                            label={t("fields.team") + ":"}
                            options={teams.map((t) => ({
                                id: t.id,
                                label: t.name,
                            }))}
                            onChange={handleTeamChange}
                            id="team"
                            withDefault={"-- " + t("selectTeam").toUpperCase()}
                            errors={errorData?.errors?.team_id}
                        />
                        <DateTimeField
                            type={"date"}
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
