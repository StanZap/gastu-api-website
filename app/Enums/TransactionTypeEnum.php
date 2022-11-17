<?php

namespace App\Enums;

enum TransactionTypeEnum: string
{
    case EXPENSE = 'expense';
    case INCOME = 'income';
    case TRANSFER = 'transfer';

    public static function random(): self {
        $max = count(self::cases()) - 1;
        return self::cases()[rand(0, $max)];
    }
}
