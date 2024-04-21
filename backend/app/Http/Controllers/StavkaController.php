<?php

namespace App\Http\Controllers;

use App\Models\StavkaProfakture;
use Illuminate\Http\Request;

class StavkaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    public function prikaziStavkeSaProizvodima()
    {
        try {

$stavke = StavkaProfakture::with('proizvod')
    ->whereNull('profaktura_id') // Dodajte ovaj uslov
    ->get();

            return response()->json($stavke);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching stavke','error' => $e->getMessage()], 500);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StavkaProfakture $stavkaProfakture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StavkaProfakture $stavkaProfakture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StavkaProfakture $stavkaProfakture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StavkaProfakture $stavkaProfakture)
    {
        //
    }
}
