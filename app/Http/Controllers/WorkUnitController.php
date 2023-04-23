<?php

namespace App\Http\Controllers;

use App\Models\Work_unit;
use Illuminate\Http\Request;

class WorkUnitController extends Controller
{
    public function index(Request $request)
    {
        $work_units = Work_unit::all()->map(function ($data) {
            return [
                'id' => $data->id,
                'work_unit' => $data->work_unit
            ];
        });

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Get data successfully"
            ],
            'data' => $work_units,
        ], 200);
    }
}
