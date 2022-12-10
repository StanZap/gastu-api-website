export interface Account {
  id: string;
  title: string;
  description: string;
  provider_name: string;
  amount: number;
  currency: string;
  owner_id: string;
  owner_type: string;
  type: string;
  created_at: string;
  updated_at: string;
  owner: {
    [key: string]: string;
  };
}
