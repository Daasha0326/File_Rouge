<?php

namespace App\Models;

use App\Models\Cour;
use App\Models\AnneeClasse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnnclasseCour extends Model
{
    use HasFactory;
    protected $guarded=["id"];

    public function cour()
    {
        return $this->belongsTo(Cour::class);
    }

    public function annee_classe()
    {
        return $this->belongsTo(AnneeClasse::class);
    }
}
