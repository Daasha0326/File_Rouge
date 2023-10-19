<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Imports\UsersImport;
use App\Models\AnneeClasse;
use App\Models\Classe;
use App\Models\Demande;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function import(Request $request)
    {
        $file = $request->file('fichier');
        // return $file;
        $data =  Excel::toArray(new UsersImport, $file);
        // return $data;
        foreach ($data as $ligne) {
            // return $ligne;
            foreach ($ligne as $column) {
                // return $column;
                $donnee = (new UsersImport)->model($column);
                $donnee->save();
                $id = $donnee->id;
                Inscription::create([
                    "annee_classe_id" => $request->annee_classe_id,
                    "user_id" => $id,
                    "date" => now(),
                ]);
                $clasId = AnneeClasse::where('id', $request->annee_classe_id)->first()->classe_id;
                Classe::where('id', $clasId)->first()->increment('effectif');
            }
        }
        return response()->json(['message' => "inscription effectuée avec succés"]);
    }

    public function store(Request $request)
    {
        $user = User::create([
            "nom" => $request->nom,
            "prenom" => $request->prenom,
            "role" => $request->role,
            "specialite" => $request->specialite,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);
        return response()->json([
            "status" => 200,
            "message" => "Isertion resuisie",
            'token' => $user->createToken("API Token")->plainTextToken,
            "user" => $user
        ]);
    }


    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error: ',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'email ou password incorrect'
                ], 401);
            }
            $user = User::where('email', $request->email)->first();
            $notif = [];
            if ($user->role == "Attache") {
                $notif = Demande::where('etat', 'refusée')->get();
            }

            return response()->json([
                'status' => true,
                'message' => 'User login successful',
                'token' => $user->createToken("API Token")->plainTextToken,
                'user' => $user,
                'notification' => count($notif)>0 ? $notif : null 
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout($id)
    {
        $user = User::find($id);
        Auth::logout($user);
        return response()->json([
            'status' => 'success',
            'message' => 'Deconnection reuisie  '
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
