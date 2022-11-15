<?php

namespace App\Enums;

enum TransactionType: string
{
    case Expense = 'expense';
    case Income = 'income';
    case Transfer = 'transfer';

    public static function random(): self {
        $max = count(self::cases()) - 1;
        return self::cases()[rand(0, $max)];
    }
}
