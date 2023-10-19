<?php

namespace App\Http\Controllers;

use App\Http\Resources\DemandeResource;
use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dem = Demande::where('etat', 'refusee')->get();
        return  DemandeResource::collection($dem);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use($request){
            return Demande::create([
                "user_id" => $request->user_id,
                "session_id" => $request->session_id,
                "motif" => $request->motif,
                "etat" => $request->etat,
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Demande $demande)
    {
        //
    }

    
    public function update(Request $request, $demande)
    {
        $dem = Demande::find($demande);
        // return $request;
        $dem->update([
            'etat' => $request->etat,
        ]);

        return response()->json(['message' => 'État de la demande mis à jour avec succès', 'demande' => $dem]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Demande $demande)
    {
        //
    }
}
