<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zaposleni extends Model
{
    use HasFactory;

    protected $table = 'zaposleni'; 
    protected $fillable = [
       'imeZaposlenog',
        'prezimeZaposlenog',
        'datumRodjenja',
        'brTelZaposlenog',
       'emailZaposlenog'
    ];

    
}
