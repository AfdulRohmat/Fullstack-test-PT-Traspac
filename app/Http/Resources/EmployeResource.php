<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeResource extends JsonResource
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
            'nip' => $this->nip,
            'fullname' => $this->fullname,
            'tempat_lahir' => $this->tempat_lahir,
            'tanggal_lahir' => $this->tanggal_lahir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'alamat' => $this->alamat,
            'picture' => $this->picture,
            'no_HP' => $this->no_HP,
            'npwp' => $this->npwp,
            'group' =>  $this->whenLoaded('group'),
            'echelon' =>  $this->whenLoaded('echelon'),
            'position' =>    $this->whenLoaded('position'),
            'tempat_tugas' => $this->tempat_tugas,
            'religion' =>  $this->whenLoaded('religion'),
            'work_unit' =>  $this->whenLoaded('work_unit'),
        ];
    }
}
