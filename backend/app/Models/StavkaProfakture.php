<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StavkaProfakture extends Model
{
    use HasFactory;

    protected $table = 'stavka_profakture'; 
    protected $fillable = [
        'kolicina',
        'iznos',
        'proizvod_id',
        'profaktura_id',
    ];

    public function proizvod()
    {
        return $this->belongsTo(Proizvod::class, 'proizvod_id');
    }

    public function profaktura()
    {
        return $this->belongsTo(Profaktura::class, 'profaktura_id');
    }

}
