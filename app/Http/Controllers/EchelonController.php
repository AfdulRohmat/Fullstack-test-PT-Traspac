<?php

namespace App\Http\Controllers;

use App\Models\Echelon;
use Illuminate\Http\Request;

class EchelonController extends Controller
{
    public function index(Request $request)
    {
        $echelons = Echelon::all()->map(function ($data) {
            return [
                'id' => $data->id,
                'echelon' => $data->echelon
            ];
        });

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Get data successfully"
            ],
            'data' => $echelons,
        ], 200);
    }
}
