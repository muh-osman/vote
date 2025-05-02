<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FemaleActor;
use Illuminate\Http\Request;

class FemaleActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:female_actors,name',
        ]);

        $actor = FemaleActor::create($validated);
        return response()->json($actor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(FemaleActor $femaleActor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FemaleActor $femaleActor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FemaleActor $femaleActor)
    {
        //
    }
}
