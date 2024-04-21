<?php

namespace App\Http\Controllers;

use App\Models\Profaktura;
use Illuminate\Http\Request;
use App\Models\StavkaProfakture;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProfakturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $profakture = Profaktura::with('dobavljac')
                ->withCount('stavke')
                ->get();


            return response()->json($profakture);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
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
        DB::beginTransaction();

        try {

            $validatedData = $request->validate([
                'profaktura.datum' => 'required|date',
                'profaktura.PDV' => 'required|numeric',
                'profaktura.ukupanIznos' => 'required|numeric',
                'profaktura.dobavljac_id' => 'required|integer',
                'stavke.*.id' => 'required|integer',
                'stavke.*.proizvod_id' => 'required|integer',
                'stavke.*.kolicina' => 'required|integer',
                'stavke.*.iznos' => 'required|numeric',
            ]);


            $profaktura = Profaktura::create($validatedData['profaktura']);

            $stavkeData = [];

            foreach ($validatedData['stavke'] as $stavka) {
                $stavkeData[] = [
                    'id' => $stavka['id'],
                    'profaktura_id' => $profaktura->id,
                    'kolicina' => $stavka['kolicina'],
                    'iznos' => $stavka['iznos'],
                    'proizvod_id' => $stavka['proizvod_id'],
                ];
            }

            StavkaProfakture::insert($stavkeData);

            DB::commit();

            return response()->json(['message' => 'Profaktura sa stavkama je kreirana'], 201);
        } catch (\Exception $e) {

            DB::rollBack();
            Log::info($e->getMessage());
            return response()->json(['message' => 'Greska kod kreiranja profakture','error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Profaktura $profaktura)
    {
        //
    }

    public function prikaziStavke(Request $request)
{
    DB::beginTransaction();
    try {
        $validateData = $request->validate(['selectedProfId' => 'required|integer']);
        $stavke = StavkaProfakture::where('profaktura_id', $validateData)->with('proizvod')->get();
        DB::commit();
        return response()->json($stavke);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => $e->getMessage()], 500);

    }
}

public function pretrazi(Request $request)
    {
        DB::beginTransaction();
        try {
            $validateData = $request->validate(['naziv_dobavljaca' => 'required|string']);


            $ugovori = Profaktura::whereHas('dobavljac', function ($query) use ($validateData) {
                $query->where('naziv_dobavljaca', $validateData['naziv_dobavljaca']);
            })->with('dobavljac')->withCount('stavke')->get();

            DB::commit();
            return response()->json($ugovori);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);

        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profaktura $profaktura)
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

            Log::info('Usao je u metodu');
            $validatedDataProfaktura = $request->validate([
                'profaktura.datum' => 'required|date',
                'profaktura.PDV' => 'required|numeric',
                'profaktura.ukupanIznos' => 'required|numeric'
            ]);


            $validatedDataStavke = $request->validate([
                'stavke.*.id' => 'required|integer',
                'stavke.*.kolicina' => 'required|integer',
                'stavke.*.iznos' => 'required|numeric',
            ]);
            $validatedDataDeletedStavke = $request->validate([
                'deletedStavke' => 'array',
                'deletedStavke.*.id' => 'required|integer',
            ]);

            $validateNoveStavke = $request->validate([
                'addedStavke' => 'array',
                'addedStavke.*.id' => 'required|integer',
                'addedStavke.*.proizvod_id' => 'required|integer',
                'addedStavke.*.kolicina' => 'required|integer',
                'addedStavke.*.iznos' => 'required|numeric',
                'addedStavke.*.profaktura_id' => 'required|integer',

            ]);


            $profaktura = Profaktura::findOrFail($id);
            $profaktura->update([
                'PDV' => $validatedDataProfaktura['profaktura']['PDV'],
                'datum' => $validatedDataProfaktura['profaktura']['datum'],
                'ukupanIznos' => $validatedDataProfaktura['profaktura']['ukupanIznos']
            ]);
            
            

            foreach ($validatedDataStavke['stavke'] as $stavkaData) {
                StavkaProfakture::where('profaktura_id', $id)
                    ->where('id', $stavkaData['id'])
                    ->update([
                        'kolicina' => $stavkaData['kolicina'],
                        'iznos' => $stavkaData['iznos'],
                    ]);
            }

            foreach ($validatedDataDeletedStavke['deletedStavke'] as $deletedStavkaData) {
                StavkaProfakture::where('profaktura_id', $id)
                    ->where('id', $deletedStavkaData['id'])
                    ->delete();
            }
            
            $noveStavkeData = [];
            foreach ($validateNoveStavke['addedStavke'] as $novaStavkaData) {
                $noveStavkeData[] = [
                    'id' => $novaStavkaData['id'],
                    'profaktura_id' => $novaStavkaData['profaktura_id'],
                    'kolicina' => $novaStavkaData['kolicina'],
                    'iznos' => $novaStavkaData['iznos'],
                    'proizvod_id' => $novaStavkaData['proizvod_id'],
                ];
            }

            StavkaProfakture::insert($noveStavkeData);
     
            DB::commit();
            // Vracam odgovor
            return response()->json(['message' => 'Profaktura i stavke su uspešno ažurirani'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            return response()->json(['message' => 'Profaktura i stavke nisu azurirani'], 500);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profaktura $profaktura)
    {
        //
    }


    public function deleteProfaktura(Request $request)
    {
        DB::beginTransaction();

        try {
            $id = $request->input('profId');

            $profaktura = Profaktura::findOrFail($id);
            StavkaProfakture::where('profaktura_id', $id)->delete();
            $profaktura->delete();


            DB::commit();
            return response()->json(['message' => 'Profaktura je uspesno obrisana'], 201);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Profaktura nije obrisana'], 500);
        }
    }
}
