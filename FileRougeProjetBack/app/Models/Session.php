<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Session extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }

    public function annclasse_cour()
    {
        return $this->belongsTo(AnnclasseCour::class);
    }
    public function demande()
    {
        return $this->hasMany(Demande::class);
    }
}
