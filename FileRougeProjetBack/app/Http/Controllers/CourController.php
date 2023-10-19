<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\User;
use App\Models\Annee;
use App\Models\Profs;
use App\Models\Classe;
use App\Models\Module;
use App\Models\Semestre;
use App\Models\AnneeClasse;
use Illuminate\Http\Request;
use App\Models\AnnclasseCour;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CourResource;
use App\Http\Resources\ProfResource;
use App\Http\Resources\UserResource;

class CourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cours = Cour::all();

        return CourResource::collection($cours);
    }

    public function allSelect()
    {
        $mod = Module::all();
        $sem = Semestre::all();
        $user = User::all();
        $classe = Classe::all();

        return response()->json([
            "module" => $mod,
            "semestre" => $sem,
            "user" => $user,
            "classe"=>$classe
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $active =  Annee::getActive()->first();
        try {
            // return $request;

            $cour = Cour::create([
                'semestre_id' => $request->semestre_id,
                'user_id' => $request->user_id,
                'module_id' => $request->module_id,
                'HeureGlobal' => $request->HeureGlobal
            ]);

            $anneeClasse = AnneeClasse::where('annee_id', $active->id)->whereIn('classe_id', $request->classes)->get()->pluck("id");
            foreach ($anneeClasse as $value) {
                AnnclasseCour::create([
                    'annee_classe_id' => $value,
                    'cour_id' => $cour->id
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Cours create successfully',
                'Cours' => CourResource::make($cour),
            ], 200);
        } catch (\Throwable $th) {
            var_dump($th);
            return response()->json(
                [
                    'status' => false,
                    'message' => $th->getMessage(),
                ],
                500
            );
        }
    }

    public function profClasse($idModule, $idSemestre)
    {
        $prof = Profs::where('module_id', $idModule)->get();
        
        return ProfResource::collection($prof);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cour $cour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cour $cour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    
    public function destroy(Cour $cour)
    {
        return DB::transaction(function () use ($cour) {

            $cours = Cour::findOrFail($cour->id);
            $cours->annee_classe()->detach();
            $cours->delete();

            return response()->json(
                [
                    'message' => 'Cours supprimé avec succès',
                    'data' => $cours,
                    'status' => 200
                ]
            );
        });
    }
}
