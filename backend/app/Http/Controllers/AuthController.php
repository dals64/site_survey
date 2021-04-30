<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(['user' => Auth::user()], 200);
        } else {
            return response()->json(['error' => "L'adresse mail et le mot de passe ne correspondent pas"], 401);
        }
    }

    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (isset($user->id)) {
            return response()->json(['error' => 'Cette adresse mail est déjà enregistrée'], 401);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        Auth::login($user);
    
        return response()->json(['user' => $user], 200);
    }

    public function logout()
    {
        Auth::logout();
    }
}
