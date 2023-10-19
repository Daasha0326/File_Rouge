<?php

namespace App\Http\Resources;

use App\Models\Cour;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnneeClasseResource extends JsonResource
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
            'classe' => new ClasseResource($this->classe),
            'annee' =>new AnneeResource($this->annee) ,
            //'cour' =>new CourRessoure($this->cour) 
        ];
    }
}
