<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MaleActor;
use Illuminate\Http\Request;

class MaleActorController extends Controller
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
            'name' => 'required|string|max:255|unique:male_actors,name',
        ]);

        $actor = MaleActor::create($validated);
        return response()->json($actor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MaleActor $maleActor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaleActor $maleActor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaleActor $maleActor)
    {
        //
    }
}
