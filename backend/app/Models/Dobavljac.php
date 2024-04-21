<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dobavljac extends Model
{
    use HasFactory;

    protected $table = 'dobavljac'; 
    protected $fillable = [
        'naziv_dobavljaca',
        'email_dobavljaca',
        'adresa'
    ];



}
