<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    use HasFactory;

    protected $fillable = ['internet_protocol', 'name', 'phone_number', 'vote'];

    // Voter has one vote for a candidate
    public function candidate()
    {
        return $this->belongsTo(Candidate::class, 'vote');
    }
}
