<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EchelonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('echelons')->insert([
            ['echelon' => "Eselon I"],
            ['echelon' => "Eselon II"],
            ['echelon' => "Eselon III"],
            ['echelon' => "Eselon IV"],
            ['echelon' => "Eselon V"],
        ]);
    }
}
