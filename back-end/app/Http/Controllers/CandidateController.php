<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::all();
        return response()->json($candidates);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
        ]);

        $candidate = Candidate::create($validatedData);
        return response()->json($candidate, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate)
    {
        $candidate = Candidate::findOrFail($id);
        return response()->json($candidate);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Candidate $candidate)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
        ]);

        $candidate = Candidate::findOrFail($id);
        $candidate->update($validatedData);
        return response()->json($candidate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();
        return response()->json(null, 204);
    }


    // Method to return the number of votes for each candidate.
    public function votesCount()
    {
        $votes = Candidate::withCount('voters')->get()->map(function ($candidate) {
            return [
                'candidate_id' => $candidate->id,
                'candidate_name' => $candidate->name,
                'votes' => $candidate->voters_count,
            ];
        });

        return response()->json($votes);
    }

}
