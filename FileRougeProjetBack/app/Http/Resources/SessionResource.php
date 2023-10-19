<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "date" => $this->date,
            "debut" => $this->debut,
            "fin" => $this->fin,
            "etat" => $this->etat,
            "salle" => new SalleResource($this->salle),
            // "annclasse_cour_id" => $this->annclasse_cour,
            "annclasse_cour" => AnnclasseCourResource::make($this->annclasse_cour)
        ];
    }
}
