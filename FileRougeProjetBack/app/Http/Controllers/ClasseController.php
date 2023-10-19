<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getClasse($id)
    {
        return Classe::where('id', $id)->first();
    }
    public function index()
    {
        return Classe::all();
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use($request){
        $classe=  Classe::create([
                "libelle" => $request->libelle,
                "effectif" => $request->effectif,
            ]);

             $classe->annee()->attach($request->annee_id);
             return $classe;
        });
    }
   
    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Classe $classe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
        //
    }
}
