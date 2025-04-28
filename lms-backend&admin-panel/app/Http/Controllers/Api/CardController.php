<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class CardController extends Controller
{
    public function useCard(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (!$user) {
            return response()->json(['success' => false, 'message' => __('auth.user_not_found')], 404);
        }
        $request->validate(['code' => 'required|exists:cards,code']);
        DB::beginTransaction();
        try {
            $card = Card::where('code', $request->code)->lockForUpdate() ->first();
            if (!$card) {
                return response()->json(['success' => false,'message' => __('card.not_found')], 404);
            }
            if ($card->is_used) {
                return response()->json(['success' => false,'message' => __('card.already_used')], 400);
            }
            // Mark the card as used
            $card->is_used = true;
            $card->save();
            // Update user balance
            $user->balance += $card->amount;
            $user->save();
            DB::commit();
            return response()->json(['success' => true,'message' => __('card.used_successfully')], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error using card: ' . $e->getMessage());
            return response()->json(['success' => false,'message' => __('card.error_occurred')], 500);
        }
    }
}
