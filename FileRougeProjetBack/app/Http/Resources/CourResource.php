<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CourResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'etat' => $this->etat,
            'semestre' => $this->semestre,
            'professeur' => $this->professeur,
            'module' => new ModuleResource($this->module),
            'HeureGlobal' => $this->HeureGlobal,
            'classe'=> AnneeClasseResource::collection($this->annee_classe)
        ];
        
    }
}
