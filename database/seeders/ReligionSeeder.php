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
            ['name' => "Islam"],
            ['name' => "Kristen"],
            ['name' => "Katolik"],
            ['name' => "Hindu"],
            ['name' => "Budha"],
            ['name' => "Konghucu"],
        ]);
    }
}
