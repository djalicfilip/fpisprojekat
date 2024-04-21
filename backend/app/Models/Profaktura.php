<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profaktura extends Model
{
    use HasFactory;

    protected $table = 'profaktura'; 
    protected $fillable = [
        'datum',
        'PDV',
        'dobavljac_id',
        'ukupanIznos',
    ];

    public function dobavljac()
    {
        return $this->belongsTo(Dobavljac::class,'dobavljac_id');
    }
    
    public function stavke()
    {
        return $this->hasMany(StavkaProfakture::class,'profaktura_id');
    }
}
