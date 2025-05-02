<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'ip_address',
        'series_id',
        'male_actor_id',
        'female_actor_id'
    ];

    public function series()
    {
        return $this->belongsTo(Series::class);
    }

    public function maleActor()
    {
        return $this->belongsTo(MaleActor::class);
    }

    public function femaleActor()
    {
        return $this->belongsTo(FemaleActor::class);
    }
}
