<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Cour extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function professeur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function semestre()
    {
        return $this->belongsTo(Semestre::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class,'module_id');
    }

    // public function classe()
    // {
    //     return $this->belongsToMany(AnneeClasse::class,'annclasse_cours', 'annee_classe_id', 'cour_id');
    // }

    public function annee_classe()
    {
        return $this->belongsToMany(AnneeClasse::class, 'annclasse_cours',  'cour_id', 'annee_classe_id');
            
    }
}
