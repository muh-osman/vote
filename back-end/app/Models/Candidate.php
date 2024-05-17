<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Candidate has many votes from voters
    public function voters()
    {
        return $this->hasMany(Voter::class, 'vote');
    }
}
