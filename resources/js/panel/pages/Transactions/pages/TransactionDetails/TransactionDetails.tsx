import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useTransactionData from "../../../../hooks/useTransactionData";
import { formatDateTime } from "../../../../utils/methods";
import AttachmentGallery from "../../../../components/AttachmentMananagement";
import AddAttachment from "../../../../components/AddAttachment";

const TransactionDetails = () => {
  const { t } = useTranslation();
  const params = useParams<{ transactionId: string }>();
  const {
    isLoading,
    transactionData: { data: tx },
  } = useTransactionData(params?.transactionId);

  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-3xl">{t("transactionDetails")}</h1>
      <div className="grid w-full grid-flow-col grid-rows-6 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading && tx ? (
          <>
            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.transactionId")}:
              </span>
              <span>{tx.id}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.amount") + ":"}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{tx.amount}</span>
                <span className="text-md uppercase text-gray-600">
                  {tx.currency}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.subject") + ":"}
              </span>
              <span>{tx.subject}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.when") + ":"}
              </span>
              <span>{formatDateTime(dayjs(tx.when))}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.transactionType") + ":"}
              </span>
              <span>{t(tx.type)}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm uppercase text-gray-500">
                {t("fields.description") + ":"}
              </span>
              {tx.description ? (
                <span>{tx.description}</span>
              ) : (
                <span className="italic text-gray-700">
                  {t("noExtraDescription")}
                </span>
              )}
            </div>

            {tx.from_account && (
              <div className="flex flex-col">
                <span className="text-md uppercase text-gray-400">
                  {t("fields.sourceAccount") + ": "}
                </span>
                <span>
                  {`${tx.from_account.title} / ${tx.from_account.owner?.name}`}
                </span>
              </div>
            )}

            {tx.to_account && (
              <div className="flex flex-col">
                <span className="text-md uppercase text-gray-400">
                  {t("fields.targetAccount") + ": "}
                </span>
                <span>
                  {`${tx.to_account.title} / ${tx.to_account.owner?.name}`}
                </span>
              </div>
            )}
          </>
        ) : (
          <p>{t("transactionDetailsLoading")}</p>
        )}
      </div>

      {tx && (
        <>
          <div className="px-4">
            <hr className="mt-10 mb-10 border border-gray-200" />
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
