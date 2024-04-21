<?php

namespace App\Http\Controllers;

use App\Models\Proizvod;
use Illuminate\Http\Request;

class ProizvodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proizvodi = Proizvod::all();
        return $proizvodi;
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
    public function show(Proizvod $proizvod)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proizvod $proizvod)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proizvod $proizvod)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proizvod $proizvod)
    {
        //
    }
}
