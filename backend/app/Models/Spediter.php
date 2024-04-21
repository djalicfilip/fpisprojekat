<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spediter extends Model
{
    use HasFactory;

    protected $table = 'spediter'; 
    protected $fillable = [
        'nazivSpeditera',
        'pib',
        'emailSpeditera'
    ];

}
