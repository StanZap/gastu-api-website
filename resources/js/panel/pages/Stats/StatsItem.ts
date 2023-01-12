export interface StatsItem {
    type: string;
    month: number;
    team_id: number | string;
    currency: string;
    amount: number;
}

export interface StatsItemGroupByMonth {
    [index: number]: [
        string,
        {
            [type: string]: {
                [currency: string]: {
                    [teamId: string]: StatsItem[];
                };
            };
        }
    ];
}

export interface MyStatsMonth {
    [month: string]: {
        [teamId: string]: {
            [type: string]: StatsItem[];
        };
    };
}
