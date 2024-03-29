<?php

namespace App\Enums;

enum CurrencyEnum: string
{
    case DOP = 'DOP';
    case USD = 'USD';
    case EUR = 'EUR';
    case CAD = 'CAD';

    public static function random(): self {
        $max = count(self::cases()) - 1;
        return self::cases()[rand(0, $max)];
    }
}
