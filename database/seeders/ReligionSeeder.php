<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReligionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('religions')->insert([
            ['religion' => "Islam"],
            ['religion' => "Kristen"],
            ['religion' => "Katolik"],
            ['religion' => "Hindu"],
            ['religion' => "Budha"],
            ['religion' => "Konghucu"],
        ]);
    }
}
