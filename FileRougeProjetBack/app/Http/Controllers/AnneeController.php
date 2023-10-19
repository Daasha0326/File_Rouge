<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnneeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Annee::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use($request){
            return  Annee::create([
                "libelle" => $request->libelle,
                "etat" => $request->etat,
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Annee $annee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Annee $annee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Annee $annee)
    {
        //
    }
}
