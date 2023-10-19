<?php

namespace App\Models;

use App\Models\AnneeClasse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classe extends Model
{
    use HasFactory;
    protected $guarded=[ ];

    public function annee()
    {
        return $this->belongsToMany(Annee::class, 'annee_classes','classe_id','annee_id');
    }

    public function annee_classe()
    {
        return $this->hasMany(AnneeClasse::class);
    }


    // protected static function booted():void
    // {
    //     static::created(function (Classe $article) {
    //         $article->annee()->attach(request()->annee_id);
    //     });
    // }
}
