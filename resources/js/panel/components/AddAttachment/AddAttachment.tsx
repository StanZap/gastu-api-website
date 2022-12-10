import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
    CheckIcon,
    CloudArrowUpIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { uploadTransactionAttachment } from "../../services/AttachmentService";
import ErrorAlert from "../Fields/ErrorAlert";
import { ValidationErrorBag } from "../../utils/types";

type AttachmentManagementProps = {
    transactionId: string;
};

const AddAttachment: FC<AttachmentManagementProps> = (props) => {
    const { transactionId } = props;
    const [attachment, setAttachment] = useState<Blob>();
    const navigate = useNavigate();
    const [showAddAttachment, setShowAddAttachment] = useState(false);
    const { t } = useTranslation();
    const [errorData, setErrorData] = useState<ValidationErrorBag>();

    const handleShowAttachmentForm = () => {
        setShowAddAttachment(!showAddAttachment);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (attachment) {
            const form = new FormData();
            form.append("transactionId", transactionId);
            form.append("image", attachment);
            form.append("title", attachment?.name || "");
            form.append("description", "");
            uploadTransactionAttachment(form).then((res) => {
                if (res.status === 201) {
                    navigate(0);
                    return;
                }
                setErrorData(res);
            });
            return;
        }
        setErrorData({
            message: t("attachment.fileNotSet"),
            errors: {},
        });
    };

    const handleFileChange = (e) => {
        if (e.target?.files?.[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="mt-5">
                <button
                    onClick={handleShowAttachmentForm}
                    type="button"
                    disabled={showAddAttachment}
                    className="mt-4 flex items-center space-x-1 rounded-sm bg-blue-500 px-5 py-2 text-gray-200"
                >
                    <PlusIcon className="h-4 w-4 text-gray-200" />
                    <span>{t("attachment.showModal")}</span>
                </button>
            </div>
            {showAddAttachment && (
                <Dialog
                    open={showAddAttachment}
                    onClose={handleShowAttachmentForm}
                    className="relative z-50"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        {/* The actual dialog panel  */}
                        <Dialog.Panel className="mx-auto max-w-lg rounded rounded-lg bg-white p-8">
                            <Dialog.Title className="mb-8 text-center text-3xl">
                                {t("attachment.modalTitle")}
                            </Dialog.Title>

                            {errorData && (
                                <ErrorAlert
                                    className="mb-4"
                                    errors={[errorData?.message]}
                                />
                            )}
                            <div className="flex flex-col space-y-4">
                                {/*<label htmlFor="newattachment"></label>*/}
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`relative flex h-8 w-8 items-center justify-center rounded-full text-lg ${
                                            attachment
                                                ? " bg-green-400 text-gray-600"
                                                : " bg-yellow-400 text-gray-600"
                                        }`}
                                    >
                                        {!attachment ? (
                                            <span>1</span>
                                        ) : (
                                            <CheckIcon className=" h-5 w-5 text-red-600" />
                                        )}
                                    </div>
                                    <input
                                        id="newattachment"
                                        type="file"
                                        className={`flex flex-col border-none ${
                                            attachment
                                                ? "hidden"
                                                : "inline-block"
                                        }`}
                                        onChange={handleFileChange}
                                    />
                                    {attachment && (
                                        <label
                                            className="shadow-4 inset-4 bg-gray-200 p-3"
                                            htmlFor="newattachment"
                                        >
                                            {attachment.name}
                                        </label>
                                    )}
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-lg text-gray-600`}
                                    >
                                        2
                                    </div>
                                    <button
                                        onClick={handleFileUpload}
                                        type="button"
                                        className="flex items-center space-x-2 rounded-sm bg-blue-500 px-5 py-2 text-gray-200"
                                    >
                                        <CloudArrowUpIcon className="h-5 w-5 " />
                                        <span>
                                            {t("attachment.uploadButton")}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </>
    );
};

export default AddAttachment;
