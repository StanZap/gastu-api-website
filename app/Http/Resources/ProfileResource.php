<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'team' => $this->currentTeam(),
            'allTeams' => $this->allTeams()->toArray(),
            'email' => $this->email,
            'profile_photo_url' => $this->profile_photo_url,
        ];
    }
}
