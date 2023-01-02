import { Account } from "../Accounts/types";

export interface Transaction {
    id: string;
    subject: string;
    when: string;
    description: string;
    amount: number;
    currency: string;
    user_id: string;
    user_name: string;
    type: string;
    account_id: number;
    created_at: string;
    updated_at: string;
    account_title: string;
    account_provider: string;
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
