<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Profs;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Module::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use($request){
            return  Module::create([
                "libelle" => $request->libelle,
                "annee_id" => $request->annee,
            ]);
        });
    }

    public function moduleProf($id)
    {
        $associations = Profs::where('user_id',$id)->get()->pluck('user_id');
        $profs=User::whereIn('id',$associations)->get();
        return $profs;
    }

    

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Module $module)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        //
    }
}
