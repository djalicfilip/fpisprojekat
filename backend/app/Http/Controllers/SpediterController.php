<?php

namespace App\Http\Controllers;

use App\Models\Spediter;
use Illuminate\Http\Request;

class SpediterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spediteri = Spediter::all();

        return response()->json($spediteri);
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
    public function show(Spediter $spediter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Spediter $spediter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Spediter $spediter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Spediter $spediter)
    {
        //
    }
}
