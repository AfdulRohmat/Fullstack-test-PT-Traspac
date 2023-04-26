<?php

namespace App\Http\Controllers;

use App\Models\Religion;
use Illuminate\Http\Request;

class ReligionController extends Controller
{
    public function index(Request $request)
    {
        $religion = Religion::all()->map(function ($data) {
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
            'data' => $religion,
        ], 200);
    }
}
