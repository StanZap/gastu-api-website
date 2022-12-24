import { Transition } from "@headlessui/react";

const BottomDrawer = ({ isOpen, setIsOpen, children }) => {
    const hide = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-40"
                    onClick={hide}
                ></div>
            )}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-45 translate-y-[1000px]"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform translate-y-96 opacity-45"
                className="w-full fixed rounded-t-3xl bottom-0 left-0 bg-slate-200 shadow-2xl min-h-16"
            >
                {children}
            </Transition>
        </>
    );
};

export default BottomDrawer;
