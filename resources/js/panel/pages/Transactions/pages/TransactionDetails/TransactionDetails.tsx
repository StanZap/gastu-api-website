import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useTransactionData from "../../../../hooks/useTransactionData";
import { formatDate } from "../../../../utils/methods";
import AttachmentGallery from "../../../../components/AttachmentMananagement";
import AddAttachment from "../../../../components/AddAttachment";
import { DetailsItem } from "../../../../components/DetailsItem/DetailsItem";
import Modal from "../../../../components/Modal";
import TransactionEdit from "../../components/TransactionEdit/TransactionEdit";
import { useState } from "react";

const TransactionDetails = () => {
    const { t } = useTranslation();
    const params = useParams<{ transactionId: string }>();
    const {
        isLoading,
        transactionData: { data: tx },
    } = useTransactionData(params?.transactionId);
    const [isShowingTxEditModal, setIsShowingTxEditModal] = useState("");
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(0);
    };

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
                            value={tx.amount}
                            showEdit={true}
                            onEditClick={() =>
                                setIsShowingTxEditModal("amount")
                            }
                        />

                        <DetailsItem
                            label={t("fields.amount") + ":"}
                            valClassNames="flex items-center space-x-2"
                            value={tx.currency}
                            showEdit={true}
                            onEditClick={() =>
                                setIsShowingTxEditModal("currency")
                            }
                        />

                        <DetailsItem
                            label={t("fields.subject") + ":"}
                            value={tx.subject}
                            showEdit={true}
                            onEditClick={() =>
                                setIsShowingTxEditModal("subject")
                            }
                        />

                        <DetailsItem
                            label={t("fields.when") + ":"}
                            value={formatDate(dayjs(tx.when))}
                        />

                        <DetailsItem
                            label={t("fields.transactionType") + ":"}
                            value={t(tx.type)}
                            showEdit={true}
                            onEditClick={() => setIsShowingTxEditModal("type")}
                        />

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
                            showEdit={true}
                            onEditClick={() =>
                                setIsShowingTxEditModal("description")
                            }
                        />

                        {tx.from_account && (
                            <DetailsItem
                                label={t("fields.account") + ":"}
                                value={`${tx.from_account.title} (${tx.from_account.provider_name})`}
                                showEdit={true}
                                onEditClick={() =>
                                    setIsShowingTxEditModal("from_account_id")
                                }
                            />
                        )}

                        <DetailsItem
                            label={t("fields.team") + ":"}
                            value={tx.team?.name ?? "-"}
                            showEdit={true}
                            onEditClick={() =>
                                setIsShowingTxEditModal("team_id")
                            }
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
                    <Modal
                        isOpen={!!isShowingTxEditModal}
                        setIsOpen={() => setIsShowingTxEditModal("")}
                    >
                        <TransactionEdit
                            transactionId={tx.id}
                            field={isShowingTxEditModal}
                            value={tx[isShowingTxEditModal]}
                            onSuccess={handleUpdate}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
};

export default TransactionDetails;
