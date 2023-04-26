<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('work_units')->insert([
            ['name' => "Kepala dinas"],
            ['name' => "Sekretaris dinas"],
            ['name' => "Sub Bagian umum dan Kepegawaian"],
            ['name' => "Sub Bagian keuangan"],
            ['name' => "Sub Bagian Program, Data, dan Informasi"],
            ['name' => "Bidang Kelembagaan dan Pemberdayaan"],
            ['name' => "Bidang Kelembagaan dan Pemberdayaan"],
            ['name' => "Bidang Penilaian dan Pengawasan"],
            ['name' => "Pejabat Fungsional"],
        ]);
    }
}
