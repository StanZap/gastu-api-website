import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Attachment } from "../../pages/Transactions/types";

type AttachmentManagementProps = {
    attachments?: Attachment[];
};

const AttachmentGallery: FC<AttachmentManagementProps> = (props) => {
    const { attachments } = props;
    const { t } = useTranslation();

    return (
        <div className="flex w-full flex-col">
            {attachments && attachments.length > 0 ? (
                <div className="mt-4 grid w-full grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {attachments?.map((a) => (
                        <div
                            key={a.id}
                            className="flex h-96 w-100 md:w-64 items-center bg-gray-200"
                        >
                            <img
                                className="h-96 w-100 md:w-64 object-contain object-center shadow-md hover:object-cover"
                                src={a.attachment_url}
                                alt="Image"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 italic text-gray-500">
                    {t("attachment.noAttachments")}
                </div>
            )}
        </div>
    );
};

export default AttachmentGallery;
