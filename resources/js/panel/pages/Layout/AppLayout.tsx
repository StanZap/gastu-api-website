import { Fragment, useState, Suspense } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import SelectField from "../../components/Fields/SelectField";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useProfileData from "../../hooks/useProfileData";
import { logout } from "../../services/AuthService";

const userNavigation = [
    {
        name: "yourProfile",
        isExternalLink: true,
        href: import.meta.env.VITE_BACKEND_URL + "/user/profile",
    },
    {
        name: "newTeam",
        isExternalLink: true,
        href: import.meta.env.VITE_BACKEND_URL + "/teams/create",
    },
    {
        name: "signout",
        href: "#",
        handler: (e) => {
            e.preventDefault();
            logout();
        },
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const lngs = [
    { id: "en", label: "English" },
    { id: "es", label: "Español" },
];

type NavItemState = {
    name: string;
    href: string;
    current?: boolean;
};

export default function AppLayout({ children }) {
    const { t, i18n } = useTranslation();
    const profileData = useProfileData();

    const [navItems] = useState<NavItemState[]>([
        { name: t("dashboard"), href: "/" },
        { name: t("transactions"), href: "/transactions" },
        { name: t("accounts"), href: "/accounts" },
        // { name: t("budgets"), href: "/budgets" },
    ]);
    const autoDetectLang = localStorage.getItem("autoLang");
    const defaultLang =
        !autoDetectLang || autoDetectLang === "true"
            ? i18n.language.substring(0, 2) // use detected lang
            : localStorage.getItem("lang") || "en"; // use saved config;

    const handleLangChange = (langId) => {
        if (langId === "auto") {
            localStorage.setItem("autoLang", langId);
        }
        i18n.changeLanguage(langId);
    };

    return (
        <Suspense fallback="...">
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                    <Disclosure as="nav" className="bg-gray-800">
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="border-b border-gray-700">
                                        <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-8 w-8"
                                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                        alt="Workflow"
                                                    />
                                                </div>
                                                <div className="hidden md:block">
                                                    <div className="ml-10 flex items-baseline space-x-4">
                                                        {navItems.map(
                                                            (item) => (
                                                                <NavLink
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    to={
                                                                        item.href
                                                                    }
                                                                    className={({
                                                                        isActive,
                                                                    }) =>
                                                                        classNames(
                                                                            isActive
                                                                                ? "bg-gray-900 text-white"
                                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                                            "rounded-md px-3 py-2 text-sm font-medium"
                                                                        )
                                                                    }
                                                                    aria-current={
                                                                        item.current
                                                                            ? "page"
                                                                            : undefined
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-4 flex items-center md:ml-6">
                                                    <SelectField
                                                        className=""
                                                        options={lngs}
                                                        defaultValue={
                                                            defaultLang
                                                        }
                                                        onChange={
                                                            handleLangChange
                                                        }
                                                        withDefaultBg={false}
                                                        withDefault={false}
                                                    />

                                                    <button
                                                        type="button"
                                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                    >
                                                        <span className="sr-only">
                                                            View notifications
                                                        </span>
                                                        <BellIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>

                                                    {/* Profile dropdown */}
                                                    <Menu
                                                        as="div"
                                                        className="relative ml-3"
                                                    >
                                                        <div>
                                                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                                <span className="sr-only">
                                                                    Open user
                                                                    menu
                                                                </span>
                                                                <img
                                                                    className="h-8 w-8 rounded-full"
                                                                    src={
                                                                        profileData?.profile_photo_url
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                {userNavigation.map(
                                                                    (item) => (
                                                                        <Menu.Item
                                                                            key={
                                                                                item.name
                                                                            }
                                                                        >
                                                                            {() =>
                                                                                item.isExternalLink ? (
                                                                                    <a
                                                                                        href={
                                                                                            item.href
                                                                                        }
                                                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                                                        target="_blank"
                                                                                    >
                                                                                        {t(
                                                                                            item.name
                                                                                        )}
                                                                                    </a>
                                                                                ) : (
                                                                                    <NavLink
                                                                                        to={
                                                                                            item.href
                                                                                        }
                                                                                        onClick={
                                                                                            item.handler
                                                                                        }
                                                                                        className={({
                                                                                            isActive,
                                                                                        }) =>
                                                                                            classNames(
                                                                                                isActive
                                                                                                    ? "bg-gray-100"
                                                                                                    : "",
                                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {t(
                                                                                            item.name
                                                                                        )}
                                                                                    </NavLink>
                                                                                )
                                                                            }
                                                                        </Menu.Item>
                                                                    )
                                                                )}
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="-mr-2 flex md:hidden">
                                                {/* Mobile menu button */}
                                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">
                                                        Open main menu
                                                    </span>
                                                    {open ? (
                                                        <XMarkIcon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <Bars3Icon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                    <div className="space-y-1 px-2 py-3 sm:px-3">
                                        {navItems.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    classNames(
                                                        isActive
                                                            ? "bg-gray-900 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        "block rounded-md px-3 py-3 text-base font-medium"
                                                    )
                                                }
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-700 pt-4 pb-3">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={
                                                        profileData?.profile_photo_url
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3 space-y-1 font-light">
                                                <div className="text-base font-medium leading-none text-white">
                                                    {profileData?.name}
                                                </div>
                                                <div className="text-sm font-medium leading-none text-gray-400">
                                                    {profileData?.email}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white px-6 px-5 py-10 shadow md:px-10">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </Suspense>
    );
}
