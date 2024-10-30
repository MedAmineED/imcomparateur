<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Exception;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'confirmed'],
            'adresse' => ['nullable', 'string'],
            'age' => ['nullable', 'integer'],
            'telephone' => ['nullable', 'string', 'max:15'],
        ]);

        try {
            $user = new User([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'adresse' => $request->adresse,
                'age' => $request->age,
                'telephone' => $request->telephone,
            ]);

            $user->save();

            Auth::attempt($request->only(['email', 'password']));

            $tokenResponse = $this->createTokenResponse(
                $this->createToken($request, $user) // Utiliser l'utilisateur créé
            );
            $registerResponse = [
                'type' => 'register_success',
                'message' => 'User successfully registered.'
            ];

            return response()->json(
                array_merge($tokenResponse, $registerResponse),
                201
            );
        } catch (Exception $e) {
            return $this->respondWithGenericError($e);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember_me' => 'boolean'
        ]);

        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'type' => 'login_failure',
                'message' => 'Invalid credentials provided.'
            ], 401);
        }

        try {
            return $this->respondWithToken($this->createToken($request));
        } catch (Exception $e) {
            return $this->respondWithGenericError($e);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();

            return response()->json([
                'type' => 'logout_success',
                'message' => 'User logged out.'
            ]);
        } catch (Exception $e) {
            return $this->respondWithGenericError($e);
        }
    }

    public function user(Request $request)
    {
        try {
            return response()->json($request->user());
        } catch (Exception $e) {
            return $this->respondWithGenericError($e);
        }
    }

    private function respondWithGenericError(Exception $exception)
    {
        return response()->json([
            'type' => get_class($exception),
            'message' => '???' . $exception->getMessage()
        ], 401);
    }

    private function createToken($request, $user = null)
    {
        $user = $user ?: $request->user();
        $token = $user->createToken(config('authenticus.authenticus_token_name'));

        if ($request->remember_me) {
            $token->token->expires_at = Carbon::now()->addDays(
                config('authenticus.authenticus_token_expiration_days')
            );
        }

        $token->token->save();

        return $token;
    }

    private function createTokenResponse($token)
    {
        return [
            'access_token' => $token->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $token->token->expires_at
            )->toDateTimeString()
        ];
    }

    private function respondWithToken($token)
    {
        return response()->json($this->createTokenResponse($token));
    }
}
