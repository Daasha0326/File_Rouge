<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('debut');
            $table->string('fin');
            $table->boolean('etatSession');
            $table->boolean('etat');
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
