<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        // MEALUKAN VALIDATION FORM HARUS TERSISI
        $request->validate([
            'username' => ['required', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'min:4', 'max:255'],
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);



        return ((new UserResource($user))->additional([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "User created successfully. Please login"
            ],
        ]));
    }

    // LOGIN
    public function login(Request $request)
    {
        // MEALUKAN VALIDATION FORM HARUS TERSISI
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'min:4', 'max:255'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email yang dimasukan salah.'],
                'password' => ['Password yang dimsukan salah.'],

            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return ((new UserResource($user))->additional([
            'access_token' => [
                'token' => $token,
                'token_type' => 'Bearer',
            ],
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "User created successfully. Please login"
            ],
        ]));
    }

    // LOGOUT
    public function logout(Request $request)
    {
        // Revoke a specific token...
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'data' => [],
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "Successfully logout"
            ],
        ], 200);
    }

    public function getDataUser(Request $request)
    {
        $user = auth()->user();
        return response()->json([
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                ]
            ],
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "Successfully logout"
            ],
        ], 200);
    }
}
