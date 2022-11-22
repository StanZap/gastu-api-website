<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\File as FileRule;
use Symfony\Component\HttpFoundation\Response as ResponseCodes;

class AddAttachmentController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'transactionId' => [
                'required',
                'exists:transactions,id',
            ],
            'image' => [
                'required',
                FileRule::image()
                    ->max(12 * 1024),
            ],
            'title' => ['nullable', "min:1"],
            'description' => ['nullable', "min:1"],
        ]);

        $path = $request->file('image')
            ->storePublicly('attachments', ['disk' => 'public']);

        $attachment = Attachment::create([
            'transaction_id' => $validated['transactionId'],
            'path' => $path,
            'title' => $validated['title'] ?? "",
            'description' => $validated['description'] ?? ""
        ]);



        return new Response(
            ["message" => "Succeed.", "data" => $attachment->toArray()],
            ResponseCodes::HTTP_CREATED
        );

    }
}
