export interface StatsItem {
    type: string;
    month: number;
    team_id: number | string;
    currency: string;
    amount: number;
}

export interface StatsItemGroupByMonth {
    [month: string]: {
        [teamId: string]: {
            [type: string]: StatsItem[];
        };
    };
    // }]: StatsItem[];
    // month: number;
    // type: string;
    // team_id: number | string;
    // currencies: Array<{ currency: string; amount: number }>;
}
