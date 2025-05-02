<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Series;
use App\Models\MaleActor;
use App\Models\FemaleActor;
use App\Models\Voter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class VoteController extends Controller
{

    // Voting
    public function storeVote(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:voters,phone|max:20',
            'series_id' => 'required|exists:series,id',
            'male_actor_id' => 'required|exists:male_actors,id',
            'female_actor_id' => 'required|exists:female_actors,id',

            'ip_address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check if IP address already exists
        $existingVote = Voter::where('ip_address', $request->ip_address)->first();
        if ($existingVote) {
            return response()->json([
                'message' => 'Vote submitted successfully!',
            ], 201);
        }

        $voter = Voter::create([
            'name' => $request->name,
            'phone' => $request->phone,
            // 'ip_address' => $request->ip(),
            'ip_address' => $request->ip_address,
            'series_id' => $request->series_id,
            'male_actor_id' => $request->male_actor_id,
            'female_actor_id' => $request->female_actor_id,
        ]);

        return response()->json([
            'message' => 'Vote submitted successfully!',
            'voter' => $voter,
        ], 201);
    }

    /**
     * Display a listing of all voters with their related data
     */
    public function getAllVoters()
    {
        $voters = Voter::with(['series', 'maleActor', 'femaleActor'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $voters
        ]);
    }

    /**
     * Get voting analytics and statistics
     */
    public function analyticsVotes()
    {
        // Total votes count
        $totalVotes = Voter::count();

        // Votes per series
        $seriesVotes = Series::withCount('voters')
            ->orderBy('voters_count', 'desc')
            ->get()
            ->map(function ($series) use ($totalVotes) {
                return [
                    'series_id' => $series->id,
                    'series_name' => $series->name,
                    'votes_count' => $series->voters_count,
                    'percentage' => $totalVotes > 0 ? round(($series->voters_count / $totalVotes) * 100, 2) : 0
                ];
            });

        // Votes per male actor
        $maleActorVotes = MaleActor::withCount('voters')
            ->orderBy('voters_count', 'desc')
            ->get()
            ->map(function ($actor) use ($totalVotes) {
                return [
                    'actor_id' => $actor->id,
                    'actor_name' => $actor->name,
                    'votes_count' => $actor->voters_count,
                    'percentage' => $totalVotes > 0 ? round(($actor->voters_count / $totalVotes) * 100, 2) : 0
                ];
            });

        // Votes per female actor
        $femaleActorVotes = FemaleActor::withCount('voters')
            ->orderBy('voters_count', 'desc')
            ->get()
            ->map(function ($actor) use ($totalVotes) {
                return [
                    'actor_id' => $actor->id,
                    'actor_name' => $actor->name,
                    'votes_count' => $actor->voters_count,
                    'percentage' => $totalVotes > 0 ? round(($actor->voters_count / $totalVotes) * 100, 2) : 0
                ];
            });

        // Votes over time (last 7 days)
        $votesOverTime = Voter::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_votes' => $totalVotes,
                'series_votes' => $seriesVotes,
                'male_actor_votes' => $maleActorVotes,
                'female_actor_votes' => $femaleActorVotes,
                'votes_over_time' => $votesOverTime,
                'last_updated' => now()->toDateTimeString()
            ]
        ]);
    }
}
