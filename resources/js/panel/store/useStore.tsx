import create from "zustand";
import { Transaction } from "../pages/Transactions/types";
import { Account } from "../pages/Accounts/types";
import { StatsItem, StatsItemGroupByMonth } from "../pages/Stats/StatsItem";
import { Budget } from "../pages/Budget/type";

interface DataList<T> {
    data: T[];
}

interface DataWrap<T> {
    data?: T;
}

interface StoreState {
    transactionList: DataList<Transaction>;
    setTransactionList: Function;
    setSortingMap: Function;
    sortingMap: any;
    accountList: DataList<Account>;
    setAccountList: Function;
    profileData: any;
    setProfileData: Function;
    transactionData: DataWrap<Transaction>;
    setTransactionData: Function;
    monthlyStats: DataList<StatsItemGroupByMonth>;
    setMonthlyStats: Function;
    setIsDrawerOpen: (isOpen: boolean, contextData: any) => void;
    isDrawerOpen: boolean;
    drawerContext: any;

    budgetData: DataWrap<Budget[]>;
    setBudgetData: Function;
}

// @ts-ignore
const useStore = create<StoreState>((set) => ({
    transactionList: {
        data: [],
    },
    setTransactionList: (res) => {
        set(() => {
            return {
                transactionList: { ...res },
            };
        });
    },
    setSortingMap: (map) => {
        set(() => {
            return {
                sortingMap: { ...map },
            };
        });
    },
    sortingMap: {
        when: "asc",
        amount: "asc",
        title: "asc",
        updatedAt: "asc",
    },
    accountList: {
        data: [],
    },
    setAccountList: (accounntRes) => {
        set(() => {
            return {
                accountList: { ...accounntRes },
            };
        });
    },
    profileData: null,
    setProfileData: (profileData) => {
        set(() => {
            return {
                profileData,
            };
        });
    },
    transactionData: {
        data: null,
    },
    setTransactionData: (transactionData) => {
        set(() => {
            return {
                transactionData,
            };
        });
    },
    monthlyStats: {
        data: [],
    },
    setMonthlyStats: (monthlyStats) => {
        set(() => {
            return {
                monthlyStats,
            };
        });
    },
    isDrawerOpen: false,
    drawerContext: null,
    setIsDrawerOpen: (isOpen, contextData) => {
        set(() => {
            return {
                isDrawerOpen: isOpen,
                drawerContext: contextData,
            };
        });
    },

    budgetData: {
        data: [],
    },
    setBudgetData: (budgetData) => {
        set(() => {
            return {
                budgetData,
            };
        });
    },
}));

export { useStore };

export type { StoreState, Account, DataList, DataWrap, Transaction, StatsItem };
