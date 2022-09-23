<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class GenerateTokenController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request)
    {
        validator([
            'email' => ['required', 'email'],
            'password' => ['required']
        ])->validate();

        $user = User::where('email', $request->get('email'))->first();

        if (Hash::check($request->get('password'), $user->getAuthPassword())) {
            return new Response([
                'token' => $user->createToken(time())->plainTextToken
            ]);
        }

        return new Response([
            "message" => "Login failed."
        ], 403);

    }
}
