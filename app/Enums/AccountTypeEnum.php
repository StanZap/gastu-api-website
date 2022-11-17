<?php

namespace App\Enums;

enum AccountTypeEnum: string
{
    case SAVINGS = 'savings';
    case CHECKING = 'checking';
    case CREDIT_CARD = 'credit_card';

    public static function random(): self {
        $max = count(self::cases()) - 1;
        return self::cases()[rand(0, $max)];
    }
}
