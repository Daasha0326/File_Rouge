<?php

use App\Models\AnneeClasse;
use App\Models\Cour;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classe_cours', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AnneeClasse::class)->constrained();
            $table->foreignIdFor(Cour::class)->constrained();
            $table->integer('heureGlobale');
            $table->integer('heureEffectue');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classe_cours');
    }
};
