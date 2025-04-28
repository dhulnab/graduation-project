<?php

namespace App\Filament\Resources\CardResource\Pages;

use App\Filament\Resources\CardResource;
use App\Models\Card;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Tables;

class ListCards extends ListRecords
{
    protected static string $resource = CardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            Actions\Action::make('add_ten_new_cards')
                ->label('Add 10 New Cards')
                ->color('danger')
                ->icon('heroicon-o-plus-circle')
                ->action(function () {
                    $amounts = [10000, 25000, 50000, 100000]; // Allowed amounts

                    for ($i = 0; $i < 10; $i++) {
                        Card::create([
                            'code' => str_pad((string)random_int(1000000000000000, 9999999999999999), 16, '0', STR_PAD_LEFT), // Ensuring 16-digit string
                            'amount' => $amounts[array_rand($amounts)], // Random amount
                            'is_used' => false, // Default to not used
                        ]);
                    }
                })
                ->requiresConfirmation()
                ->successNotificationTitle('10 New Cards Added Successfully'),
            Actions\Action::make('export_the_most_recent_10_cards')
                ->label('Export 10 Cards')
                ->color('customPurple')
                ->icon('heroicon-o-arrow-up-on-square')
                ->requiresConfirmation()
                ->action(function () {
                    $cards = Card::latest()->limit(10)->get();

                    $filename = 'most_recent_10_cards_' . now()->format('Y-m-d_H-i-s') . '.csv';

                    $handle = fopen(storage_path('app/' . $filename), 'w');

                    fputcsv($handle, ['Code', 'Amount', 'Is Used', 'Created At']);

                    foreach ($cards as $card) {
                        fputcsv($handle, [
                            "'" . $card->code, // Force Excel to treat it as text by prefixing with a single quote
                            $card->amount,
                            $card->is_used ? 'Yes' : 'No',
                            $card->created_at?->format('Y-m-d H:i:s'), // Ensuring created_at is formatted
                        ]);
                    }

                    fclose($handle);

                    return response()->download(storage_path('app/' . $filename))->deleteFileAfterSend();
                })
                ->successNotificationTitle('Most Recent 10 Cards Exported Successfully'),

        ];
    }
}
