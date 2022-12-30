interface Budget {
    id: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    team_id: string;
    created_at: string;
    updated_at: string;
    amounts?: CurrencyAmount[];
    budgetItems?: BudgetItem[];
}

interface CurrencyAmount {
    currency: string;
    value: string;
}

interface BudgetItem {
    id: string;
    subject: string;
    description: string;
    amount: number;
    currency: string;
    budget_id: string;
    team_id: string;
    created_at: string;
    updated_at: string;
}

export { Budget, CurrencyAmount, BudgetItem };
