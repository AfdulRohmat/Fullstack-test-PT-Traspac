<?php

namespace App\Http\Middleware;

use App\Models\Employe;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PemilikData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $currentUserId = auth()->user()->id;

        $dataEmploye = Employe::findOrFail($request->id);

        if ($dataEmploye->user_id != $currentUserId) {
            return response()->json([
                'meta' => [
                    'code' => 404,
                    'status' => 'Error',
                    'message' => "Data not found "
                ],
                'data' => []
            ], 404);
        }
        return $next($request);
    }
}
