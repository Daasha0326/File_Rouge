<?php

namespace App\Models;

use App\Models\AnneeClasse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Annee extends Model
{
    use HasFactory;

    protected $guarded = [

    ];
    public function scopeGetActive(Builder $builder)
    {
        $builder->where("etat",1);
    }

    public function annee_classe()
    {
        return $this->hasMany(AnneeClasse::class);
    }

}
