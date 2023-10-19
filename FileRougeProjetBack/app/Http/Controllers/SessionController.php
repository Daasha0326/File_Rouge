<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnnclasseCourResource;
use App\Http\Resources\ClasseResource;
use App\Http\Resources\CourRessoure;
use App\Http\Resources\SessionResource;
use App\Models\AnnclasseCour;
use App\Models\Annee;
use App\Models\AnneeClasse;
use App\Models\Classe;
use App\Models\Cour;
use App\Models\Module;
use App\Models\Salle;
use App\Models\Semestre;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\search;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = Session::all();
        return SessionResource::collection($all);
        // return Session::all();
    }

    public function chargerSelect()
    {
        $mod = Module::all();
        $sem = Semestre::all();
        $user = User::all();
        $classe = Classe::all();
        $salle = Salle::all();

        return response()->json([
            "module" => $mod,
            "semestre" => $sem,
            "user" => $user,
            "classe" => $classe,
            "salle" => $salle
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* 
        {
            "date": "10-10-2023",
            "debut": "10h",
            "fin":"11h" ,
            "etat":"1" ,
            "salle_id": "2",
            "cour_id":"6" ,
            "classe_id":[3,6]
        }
        */
        // return $request->all();
        return DB::transaction(function () use ($request) {

            $duree = $request->fin - $request->debut;
            $time = Cour::where('id', $request->cour_id)->first();
            $time->decrement('HeureGlobal', $duree);

            if ($request->salle_id != null) {
                $all = Session::where('salle_id', $request->salle_id)
                    ->where('date', $request->date)
                    ->whereBetween('debut', [$request->debut, $request->fin])
                    ->orWhere(function ($query) use ($request) {
                        $query->whereBetween('fin', [$request->debut, $request->fin]);
                    })
                    ->get();
                // return $all;

                // if (count($all) != 0) {
                //     return "aldiey bou khady gueye";
                // }
            }

            $cour_id = Cour::where('id', $request->cour_id)->first()->id;
            // return $cour_id;
            $compare = AnnclasseCour::where('cour_id', $cour_id)->get();
            // return $compare;
            $tab = [];

            foreach ($compare as $value) {
                $sessions = Session::where('annclasse_cour_id', $value->id)
                    ->where('date', $request->date)->get();

                foreach ($sessions as $session) {
                    $tab[] = $session;
                }
            }

            // return $tab;
            foreach ($tab as $value) {
                if ($request->debut == $value->debut) {
                    return response()->json(["message" => "le prof n'est pas disponible"]);
                }
                if ($request->debut > $value->debut && $request->debut < $value->fin) {
                    return response()->json(["message" => "le prof n'est pas disponibles"]);
                }
                if ($request->fin < $value->fin && $request->fin > $value->debut) {
                    return response()->json(["message" => "le prof n'est pas disponiblesa"]);
                }
            }

            $salle = Salle::find($request->salle_id);
            $classes = AnneeClasse::whereIn('classe_id', $request->classe_id)->get();
            // return $classes;
            $tab = [];
            foreach ($classes as $value) {
                $search = AnnclasseCour::where('annee_classe_id', $value->id)
                    ->where('cour_id', $request->cour_id)->first();
                $tab[] = $search;
            }
            // return $tab;

            $capaciteSalle = $salle->place;
            $capaciteRequise = 0;
            foreach ($request->classe_id as $value) {
                $effectif = Classe::where('id', $value)->first()->effectif;
                $capaciteRequise += $effectif;
            }
            // return $capaciteRequise;
            // return $capaciteSalle;
            // $capaciteRequise = $classes->sum('effectif');
            // return $capaciteRequise;
            if ($capaciteRequise <= $capaciteSalle) {
                foreach ($tab as $value) {

                    return SessionResource::make(Session::create([
                        "date" => $request->date,
                        "debut" => $request->debut,
                        "fin" => $request->fin,
                        "etat" => $request->etat,
                        "salle_id" => $request->salle_id,
                        "annclasse_cour_id" => $value->id,
                    ]));
                }
            } else {
                return response()->json(['message' => 'La capacité de la salle est insuffisante pour accueillir toutes les classes.'], 400);
            }
        });
    }

    public function classeCours($idCours)
    {
        $clas = AnnclasseCour::where('cour_id', $idCours)->get();
        $tab = [];
        foreach ($clas as $value) {
            $anneclas = AnneeClasse::where('id', $value->annee_classe_id)->first()->classe_id;
            $tab[] = $anneclas;
        }

        $classes = [];
        foreach ($tab as $value) {
            $classe = Classe::where('id', $value)->first();
            $classes[] = $classe;
        }
        return $classes;
    }

    public function sessionsProfesseur($professeurId)
    {
        $recupCour = Cour::where('user_id', $professeurId)->pluck('id');
        // return $recupCour;
        $recupByAnnclassCour = AnnclasseCour::whereIn('cour_id', $recupCour)->pluck('id');
        // return $recupByAnnclassCour;
        $recupSession = Session::whereIn('annclasse_cour_id', $recupByAnnclassCour)->get();
        return SessionResource::collection($recupSession);
        $tab = [];
        foreach ($recupSession as $value) {
            // return $value;
            // $gg= new SessionResource($value);
            //return $gg;
            //$tab[]=$gg;
        }
        return $tab;
    }

    /**
     * Display the specified resource.
     */
    public function salleDispo($effectifs)
    {
        $sallesDisponibles = Salle::where('place', '>=', $effectifs)->get();
        return $sallesDisponibles;
    }

    public function show(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $session)
    {
        
        $session->update([
            'etat' => $request->etat,
        ]);

        return response()->json(['message' => 'État de la session mis à jour avec succès', 'session' => $session]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        return DB::transaction(function () use ($session) {

            $cours = Session::findOrFail($session->id);
            $cours->delete();

            return response()->json(
                [
                    'message' => 'session supprimé avec succès',
                    'data' => $session,
                    'status' => 200
                ]
            );
        });
    }
}
