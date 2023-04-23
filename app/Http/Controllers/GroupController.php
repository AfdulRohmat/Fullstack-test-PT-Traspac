<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groups = Group::all()->map(function ($data) {
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
            'data' => $groups,
        ], 200);
    }
}
