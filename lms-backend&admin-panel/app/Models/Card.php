<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['code', 'amount', 'is_used'];

    protected $casts = [
        'is_used' => 'boolean',
    ];
    
}
