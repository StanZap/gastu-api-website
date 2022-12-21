import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useTransactionData from "../../../../hooks/useTransactionData";
import { formatDateTime } from "../../../../utils/methods";
import AttachmentGallery from "../../../../components/AttachmentMananagement";
import AddAttachment from "../../../../components/AddAttachment";

const DetailsItem = (props) => {
    const { label, value, valClassNames } = props;
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-gray-500">{label}</span>
            <div className={valClassNames + " text-xl"}>{value}</div>
        </div>
    );
};

const TransactionDetails = () => {
    const { t } = useTranslation();
    const params = useParams<{ transactionId: string }>();
    const {
        isLoading,
        transactionData: { data: tx },
    } = useTransactionData(params?.transactionId);

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl">{t("transactionDetails")}</h1>
            <div className="px-0">
                <hr className="mt-6 mb-6 border border-gray-200" />
            </div>
            <div className="grid w-full gap-5 md:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {!isLoading && tx ? (
                    <>
                        <DetailsItem
                            label={t("fields.transactionId")}
                            value={tx.id}
                        />

                        <DetailsItem
                            label={t("fields.amount") + ":"}
                            valClassNames="flex items-center space-x-2"
                            value={
                                <>
                                    <span className="text-2xl font-bold">
                                        {tx.amount}
                                    </span>
                                    <span className="text-md uppercase text-gray-600">
                                        {tx.currency}
                                    </span>
                                </>
                            }
                        />

                        <DetailsItem
                            label={t("fields.subject") + ":"}
                            value={tx.subject}
                        />

                        <DetailsItem
                            label={t("fields.when") + ":"}
                            value={formatDateTime(dayjs(tx.when))}
                        />

                        <DetailsItem
                            label={t("fields.transactionType") + ":"}
                            value={t(tx.type)}
                        />

                        {}
                        <DetailsItem
                            label={t("fields.description") + ":"}
                            value={
                                tx.description ? (
                                    <span>{tx.description}</span>
                                ) : (
                                    <span className="italic text-md text-gray-500">
                                        {t("noExtraDescription")}
                                    </span>
                                )
                            }
                        />

                        {tx.from_account && (
                            <DetailsItem
                                label={t("fields.fromAccount") + ":"}
                                value={`${tx.from_account.title} / ${tx.from_account.owner?.name}`}
                            />
                        )}

                        {tx.to_account && (
                            <DetailsItem
                                label={t("fields.targetAccount") + ":"}
                                value={`${tx.to_account.title} / ${tx.to_account.owner?.name}`}
                            />
                        )}

                        <DetailsItem
                            label={t("fields.team") + ":"}
                            value={tx.team?.name ?? "-"}
                        />
                    </>
                ) : (
                    <p>{t("transactionDetailsLoading")}</p>
                )}
            </div>

            {tx && (
                <>
                    <div className="px-0">
                        <hr className="mt-6 mb-6 border border-gray-200" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl">{t("fields.attachments")}</h1>
                        <AttachmentGallery attachments={tx.attachments} />
                        <AddAttachment transactionId={tx.id} />
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionDetails;
