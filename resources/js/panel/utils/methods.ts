import dayjs from "dayjs";

export const DEFAULT_CURRENCY = "DOP";

export const formatDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY");
};
export const formatDateTime = (date) => {
    return dayjs(date).format("MMM DD, YYYY hh:mm a");
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(amount);
};
