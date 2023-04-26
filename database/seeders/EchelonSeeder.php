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
            ['name' => "Eselon I"],
            ['name' => "Eselon II"],
            ['name' => "Eselon III"],
            ['name' => "Eselon IV"],
            ['name' => "Eselon V"],
        ]);
    }
}
