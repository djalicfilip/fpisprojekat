<?php

namespace App\Http\Controllers;

use App\Models\NalogZaCarinjenje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NalogZaCarinjenjeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       //
    }

    public function prikaziNaloge()
    {
        DB::beginTransaction();
        try {

            $nalozi = NalogZaCarinjenje::with('zaposleni', 'spediter', 'faktura') ->whereHas('zaposleni')
            ->whereHas('spediter')
            ->whereHas('faktura')
            ->get();
            DB::commit();

            return response()->json($nalozi);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error fetching nalozi'], 500);
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

    public function kreirajNalog(Request $request)
    {

        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'datumNaloga' => 'required|date',
    'sadrzajNaloga' => 'required|string',
    'zaposleni_id' => 'required|integer',
    'spediter_id' => 'required|integer',
    'faktura_id' => 'required|integer',
], [
    'required' => 'Polje :attribute je obavezno.',
    'date' => 'Polje :attribute mora biti u ispravnom formatu datuma.',
    'string' => 'Polje :attribute mora biti tekst.',
    'integer' => 'Polje :attribute mora biti broj.',
]);
           


            $nalog = NalogZaCarinjenje::create($validatedData);
            DB::commit();

            return response()->json(['message' => 'Nalog je uspesno kreiran', 'nalog' => $nalog], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error kod kreiranja naloga', 'error' => $e->getMessage()], 500);
        }


    }
    /**
     * Display the specified resource.
     */
    public function show(NalogZaCarinjenje $nalogZaCarinjenje)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NalogZaCarinjenje $nalogZaCarinjenje)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'datumNaloga' => 'required|date',
                'sadrzajNaloga' => 'required|string',
                'zaposleni_id' => 'required|integer',
                'spediter_id' => 'required|integer',
                'faktura_id' => 'required|integer',
            ]);


            $nalog = NalogZaCarinjenje::findOrFail($id);


            $nalog->update($validatedData);
            DB::commit();
            return response()->json(['message' => 'Nalog je uspesno izmenjen'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Nalog nije uspesno izmenjen'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NalogZaCarinjenje $nalogZaCarinjenje)
    {
        //
    }

    public function deleteNalog(Request $request, NalogZaCarinjenje $nalog)
    {
        try {

            $nalog->delete();

            return response()->json(['message' => 'Nalog obrisan'], 201);
        } catch (\Exception $e) {
            \Log::info($e->getMessage());
            return response()->json(['message' => 'Error deleting nalog', 'error' => $e->getMessage()], 500);
        }
    }
}
