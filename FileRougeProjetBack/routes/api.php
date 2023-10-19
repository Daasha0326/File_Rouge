<?php

use App\Http\Controllers\AnneeController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CourController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('annees', [AnneeController::class, 'index']);
Route::post('annees', [AnneeController::class, 'store']);

Route::get('sessions', [SessionController::class, 'index']);
Route::get('selectAll', [SessionController::class, 'chargerSelect']);
Route::post('sessions', [SessionController::class, 'store']);
Route::put('sessionsUp/{session}', [SessionController::class, 'update']);
Route::delete('sessions/{session}', [SessionController::class, 'destroy']);
Route::get('professeurs/{professeurId}/sessions', [SessionController::class,'sessionsProfesseur']);
Route::get('classeCours/{idCours}', [SessionController::class, 'classeCours']);

Route::post('modules', [ModuleController::class, 'store']);
Route::get('modules/{id}', [ModuleController::class, 'moduleProf']);

Route::post('login', [UserController::class, 'loginUser']);
Route::get('login/{id}', [UserController::class, 'logout']);
Route::post('users', [UserController::class, 'store']);

Route::post('users/import', [UserController::class, 'import']);

Route::get('classes', [ClasseController::class, 'index']);
Route::post('classes', [ClasseController::class, 'store']);
Route::get('classes/{id}', [ClasseController::class, 'getClasse']);

Route::get('cours', [CourController::class, 'index']);
Route::post('cours', [CourController::class, 'store']);
Route::get('coursAll', [CourController::class, 'allSelect']);
Route::delete('cours/{cour}', [CourController::class, 'destroy']);

Route::get('cours/{idModule}/semestre/{idSemestre}', [CourController::class, 'profClasse']);

Route::get('salleDis/{effectifs}', [SessionController::class, 'salleDispo']);

Route::post('demandes', [DemandeController::class, 'store']);
Route::get('demandes', [DemandeController::class, 'index']);
Route::put('demandes/{demande}', [DemandeController::class, 'update']);

