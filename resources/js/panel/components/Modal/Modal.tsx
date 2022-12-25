import { FC, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import BottomDrawer from "../BottomDrawer";
import defaultTheme from "tailwindcss/defaultTheme";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: boolean;
    children: Element;
    modalClassName?: string;
    drawerClassName?: string;
}

enum ViewModeEnum {
    MODAL = "modal",
    DRAWER = "drawer",
}

const Modal: FC<ModalProps> = (props) => {
    const { isOpen, setIsOpen, children, modalClassName, drawerClassName } =
        props;
    const [viewMode, setViewMode] = useState<ViewModeEnum>();
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(innerHeight);
        }

        window.addEventListener("resize", () =>
            setWindowSize(window.innerWidth)
        );

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const mdWidth = +defaultTheme.screens.md.replace("px", "");
        if (windowSize >= mdWidth) {
            setViewMode(ViewModeEnum.MODAL);
        } else {
            setViewMode(ViewModeEnum.DRAWER);
        }
    }, [windowSize]);

    return viewMode === ViewModeEnum.MODAL ? (
        <Dialog
            onClose={() => setIsOpen(false)}
            open={isOpen}
            className={modalClassName}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="mx-auto max-w-lg rounded rounded-lg bg-white p-8">
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    ) : (
        <BottomDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={drawerClassName}
        >
            {children}
        </BottomDrawer>
    );
};

export default Modal;
