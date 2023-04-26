<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $positions = Position::all()->map(function ($data) {
            return [
                'id' => $data->id,
                'name' => $data->name
            ];
        });

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Get data successfully"
            ],
            'data' => $positions,
        ], 200);
    }
}
