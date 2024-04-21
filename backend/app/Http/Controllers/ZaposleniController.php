<?php

namespace App\Http\Controllers;

use App\Models\Zaposleni;
use Illuminate\Http\Request;

class ZaposleniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $zaposleni = Zaposleni::all();

        return response()->json($zaposleni);
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
    public function show(Zaposleni $zaposleni)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Zaposleni $zaposleni)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zaposleni $zaposleni)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zaposleni $zaposleni)
    {
        //
    }
}
