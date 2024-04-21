<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpediterController;
use App\Http\Controllers\FakturaController;
use App\Http\Controllers\DobavljacController;
use App\Http\Controllers\ZaposleniController;
use App\Http\Controllers\NalogZaCarinjenjeController;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\ProfakturaController;
use App\Http\Controllers\StavkaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/spediteri', [SpediterController::class, 'index']);
Route::get('/zaposleni', [ZaposleniController::class, 'index']);
Route::get('/dobavljaci', [DobavljacController::class, 'index']);
Route::get('/fakture', [FakturaController::class, 'index']);
Route::get('/proizvodi', [ProizvodController::class, 'index']);
Route::get('/nalozi', [NalogZaCarinjenjeController::class, 'prikaziNaloge']);
Route::post('/nalog', [NalogZaCarinjenjeController::class, 'kreirajNalog']);
Route::put('/nalog/{id}', [NalogZaCarinjenjeController::class, 'update']);

Route::delete('/nalog/{nalog}', [NalogZaCarinjenjeController::class, 'deleteNalog']);
Route::get('/profakture', [ProfakturaController::class, 'index']);
Route::post('/profaktura', [ProfakturaController::class, 'store']);
Route::delete('/profaktura', [ProfakturaController::class, 'deleteProfaktura']);
Route::get('/pretraga', [ProfakturaController::class, 'pretrazi']);
Route::put('/profaktura/{id}', [ProfakturaController::class, 'update']);
Route::get('/stavke', [ProfakturaController::class, 'prikaziStavke']);