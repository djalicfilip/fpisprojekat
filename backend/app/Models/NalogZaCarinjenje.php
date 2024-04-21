<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NalogZaCarinjenje extends Model
{
    use HasFactory;

    protected $table = 'nalog_za_carinjenje'; 
    protected $fillable = [
        'datumNaloga',
        'sadrzajNaloga',
        'zaposleni_id',
        'spediter_id',
        'faktura_id',
    ];

    public function zaposleni()
    {
        return $this->belongsTo(Zaposleni::class,'zaposleni_id');
    }

    public function faktura()
    {
        return $this->belongsTo(Faktura::class,'faktura_id');
    }

    public function spediter()
    {
        return $this->belongsTo(Spediter::class,'spediter_id');
    }
}
