<?php

namespace App\Http\Controllers;

use App\Models\Faktura;
use Illuminate\Http\Request;

class FakturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faktura = Faktura::all();

        return response()->json($faktura);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function fakturaZaId(Request $request)
    {
        try {

            $nalogId = $request->input('faktura_id');
            $nalog = Nalog::findOrFail($nalogId);


            $spediter = $nalog->spediter;


            return response()->json($spediter);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Spediter not found'], 404);
        }
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
    public function show(Faktura $faktura)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faktura $faktura)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faktura $faktura)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faktura $faktura)
    {
        //
    }
}
