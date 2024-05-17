<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use Illuminate\Http\Request;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voters = Voter::with('candidate')->get();
        return response()->json($voters);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'phone_number' => 'required|unique:voters|max:255',
            'vote' => 'required|exists:candidates,id',
        ]);

        $voter = Voter::create($validatedData);
        return response()->json($voter, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Voter $voter)
    {
        $voter = Voter::with('candidate')->findOrFail($id);
        return response()->json($voter);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voter $voter)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'phone_number' => 'required|unique:voters,phone_number,' . $id . '|max:255',
            'vote' => 'required|exists:candidates,id',
        ]);

        $voter = Voter::findOrFail($id);
        $voter->update($validatedData);
        return response()->json($voter);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voter $voter)
    {
        $voter = Voter::findOrFail($id);
        $voter->delete();
        return response()->json(null, 204);
    }

}
