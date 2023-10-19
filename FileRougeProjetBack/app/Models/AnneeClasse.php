<?php

namespace App\Models;

use App\Models\Cour;
use App\Models\Annee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnneeClasse extends Model
{
    use HasFactory;

    public function classe() : BelongsTo
    {
        return $this->belongsTo(Classe::class);
            
    }

    public function annee() : BelongsTo
    {
        return $this->belongsTo(Annee::class);
            
    }

    public function cour()
    {
        return $this->belongsToMany(Cour::class, 'annclasse_cours',  'annee_classe_id', 'cour_id');
            
    }

}
