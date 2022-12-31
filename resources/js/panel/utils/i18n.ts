import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        returnObjects: true,
        resources: {
            en: {
                translation: {
                    dashboard: "Dashboard",
                    source: "Source",
                    target: "Destination",
                    yourProfile: "Your profile",
                    newTeam: "Add new team",
                    signout: "Sign out",
                    transactions: "Transactions",
                    income: "Income",
                    myincome: "My Income",
                    incomes: "Incomes",
                    expense: "Expenses",
                    myexpense: "My Expenses",
                    expenses: "Expenses",
                    transfer: "Transfer",
                    accounts: "Accounts",
                    accountListMessage: "All your accounts",
                    transactionListMessage:
                        "The history of your expenses, income and transfers.",
                    registerTransactionLink: "Register Transaction",
                    registerTransactionLinkShort: "Transaction",
                    addAccountLink: "Add Account",
                    searchPlaceholder: "Search: subject or description",
                    editing: "Editing",
                    loading: "Loading",
                    details: "Details",
                    nothingToShow: "Nothing to show :(",
                    addAccounts: "Start by adding an account",
                    addTransactions: "Empieza a registrar transacciones",
                    selectTransactionType: "Select transaction type",
                    selectAccount: "Select account",
                    selectOwner: "Select Owner Team",
                    selectTeam: "Select Team",
                    savings: "Savings Account",
                    checking: "Checking Account",
                    creditcard: "Credit Card",
                    cash: "Cash",
                    fields: {
                        title: "Title",
                        name: "Name",
                        subject: "Subject",
                        amount: "Amount",
                        description: "Description",
                        when: "When",
                        updatedAt: "Updated",
                        providerName: "Provider",
                        owner: "Owner",
                        createdAt: "Creation",
                        transactionId: "Transaction ID",
                        transactionType: "Transaction Type",
                        type: "Transaction Type",
                        transactionTypeShort: "Type",
                        accountType: "Account Type",
                        attachments: "Attachments",
                        team_id: "Team",
                        team: "Team",
                        user: "User",
                        account: "Account",
                        account_id: "Account",
                        currency: "Currency",
                    },
                    pagination: {
                        showing: "Showing",
                        of: "of",
                        to: "to",
                        results: "results",
                        prev: "Previous",
                        next: "Next",
                    },
                    register: "Register",
                    update: "Update",
                    cancel: "Cancel",
                    edit: "Edit",
                    reset: "Reset",
                    invalidNumberError: "Value you introduced is not a number.",
                    increased: "Increased",
                    decreased: "Decreased",
                    monthlyStatsCardHeading: "Monthly Stats",
                    by: "by",
                    from: "from",
                    transactionDetails: "Transaction Details",
                    noExtraDescription: "No more description.",
                    attachments: "Attachments",
                    transactionDetailsLoading:
                        "Transaction details are loading...",
                    months: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    attachment: {
                        modalTitle: "New Attachment",
                        uploadButton: "Attach a file",
                        noAttachments: "No file attachments yet",
                        showModal: "Attach some images",
                        fileNotSet: "You must specify the file to be uploaded",
                    },
                    goToTransactions: "Go to Transactions",
                    goToAccounts: "Go to Accounts",
                    allStatsBtn: "Teams",
                    myStatsBtn: "My Stats",
                    allTxBtn: "Teams",
                    myTxBtn: "Mine",
                    noTransactions: "No Transactions to show",
                    saveButton: "Save",
                    currentValue: "Current Value",
                    unspecified: "Unspecified",
                    budgets: "Budgets",
                    myBudgets: "My Budgets",
                    viewMore: "View More",
                },
            },
            es: {
                translation: {
                    dashboard: "Inicio",
                    source: "Origen",
                    target: "Destino",
                    yourProfile: "Tu Perfil",
                    newTeam: "Agregar nuevo equipo",
                    signout: "Cerrar Sesión",
                    transactions: "Transacciones",
                    income: "Ingreso",
                    myincome: "Mis Ingresos",
                    incomes: "Ingresos",
                    expense: "Gasto",
                    myexpense: "Mis Gastos",
                    expenses: "Gastos",
                    transfer: "Transferencia",
                    accounts: "Cuentas",
                    accountListMessage: "Todas tus cuentas",
                    transactionListMessage:
                        "El hisorial de gastos, ingresos y transferencias",
                    registerTransactionLink: "Registrar Transacción",
                    registerTransactionLinkShort: "Transacción",
                    addAccountLink: "Agregar Cuenta",
                    searchPlaceholder:
                        "Buscar: descripción corta o observaciones",
                    editing: "Editando",
                    loading: "Cargando",
                    details: "Detalles",
                    nothingToShow: "Nada que mostrar :(",
                    addAccounts: "Empieza agregando una cuenta",
                    addTransactions: "Empieza a registrar transacciones",
                    selectTransactionType: "Seleccione tipo de transacción",
                    selectAccount: "Seleccione cuenta",
                    selectOwner: "Seleccione Titular",
                    selectTeam: "Seleccione Equipo",
                    savings: "Cuenta de Ahorro",
                    checking: "Cuenta Corriente",
                    creditcard: "Credit Card",
                    cash: "Efectivo",
                    fields: {
                        title: "Título",
                        name: "Nombre",
                        subject: "Descripción",
                        amount: "Cantidad",
                        description: "Descripción (extra)",
                        when: "Cuando",
                        updatedAt: "Actualización",
                        providerName: "Proveedor",
                        owner: "Titular",
                        createdAt: "Creación",
                        transactionId: "ID Transacción",
                        transactionType: "Tipo de Transacción",
                        type: "Tipo de Transacción",
                        transactionTypeShort: "Tipo",
                        accountType: "Tipo de Cuenta",
                        attachments: "Adjuntos",
                        team: "Equipo",
                        team_id: "Equipo",
                        user: "Usuario",
                        account_id: "Cuenta",
                        account: "Cuenta",
                        currency: "Moneda",
                    },
                    pagination: {
                        showing: "Mostrando",
                        of: "de",
                        to: "a",
                        results: "resultados",
                        prev: "Anterior",
                        next: "Siguiente",
                    },
                    register: "Registrar",
                    update: "Actualizar",
                    cancel: "Cancelar",
                    edit: "Editar",
                    reset: "Resetear",
                    invalidNumberError: "Valor introducido no es un número.",
                    increased: "Incremento",
                    decreased: "Decremento",
                    monthlyStatsCardHeading: "Estadísticas Mensuales",
                    by: "por",
                    from: "de",
                    transactionDetails: "Detalles de Transacción",
                    noExtraDescription: "Ninguna",
                    attachments: "Adjuntos",
                    transactionDetailsLoading:
                        "Detalles de transacción están cargando...",
                    months: [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                    ],
                    attachment: {
                        modalTitle: "Nuevo adjunto",
                        uploadButton: "Adjuntar archivo",
                        noAttachments: "No hay adjuntos todavía",
                        showModal: "Adjuntar imágenes",
                        fileNotSet: "Debes especificar el archivo a subir",
                    },
                    goToTransactions: "Ir a Transacciones",
                    goToAccounts: "Ir a Cuentas",
                    allStatsBtn: "Equipos",
                    myStatsBtn: "Mías",
                    allTxBtn: "Todas",
                    myTxBtn: "Mias",
                    noTransactions: "Sin transacciones",
                    saveButton: "Guardar",
                    currentValue: "Valor Actual",
                    unspecified: "Sin Especificar",
                    budgets: "Presupuestos",
                    myBudgets: "Mis Presupuestos",
                    viewMore: "Ver más",
                },
            },
        },
    });

export default i18n;
