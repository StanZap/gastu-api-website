import { Account } from "../Accounts/types";

export interface Transaction {
    id: string;
    subject: string;
    when: string;
    description: string;
    amount: number;
    currency: string;
    user_id: string;
    type: string;
    from_account_id: number;
    to_account_id: number;
    created_at: string;
    updated_at: string;
    from_account?: Account;
    to_account?: Account;
    attachments?: Attachment[];
    team_id?: string;
}

export interface Attachment {
    id?: number;
    transaction_id: string;
    title: string;
    description: string;
    attachment_url: string;
    path: string;
}
