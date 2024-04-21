<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faktura extends Model
{
    use HasFactory;

    protected $table = 'faktura'; 
    protected $fillable = [
        'napomena',
        'datum',
        'spediter_id',
        'dobavljac_id',
    ];


 public function spediter()
 {
     return $this->belongsTo(Spediter::class,'spediter_id');
 }


 public function dobavljac()
 {
     return $this->belongsTo(Dobavljac::class,'dobavljac_id');
 }

}
