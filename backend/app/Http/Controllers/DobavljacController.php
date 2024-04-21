<?php

namespace App\Http\Controllers;

use App\Models\Dobavljac;
use Illuminate\Http\Request;

class DobavljacController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dobavljaci = Dobavljac::all();

        return response()->json($dobavljaci);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function spediterZaId(Request $request)
    {
        try {

            $nalogId = $request->input('spediter_id');
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
    public function show(Dobavljac $dobavljac)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dobavljac $dobavljac)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dobavljac $dobavljac)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dobavljac $dobavljac)
    {
        //
    }
}
