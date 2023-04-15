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
            ['work_unit' => "Kepala dinas"],
            ['work_unit' => "Sekretaris dinas"],
            ['work_unit' => "Sub Bagian umum dan Kepegawaian"],
            ['work_unit' => "Sub Bagian keuangan"],
            ['work_unit' => "Sub Bagian Program, Data, dan Informasi"],
            ['work_unit' => "Bidang Kelembagaan dan Pemberdayaan"],
            ['work_unit' => "Bidang Kelembagaan dan Pemberdayaan"],
            ['work_unit' => "Bidang Penilaian dan Pengawasan"],
            ['work_unit' => "Pejabat Fungsional"],
        ]);
    }
}
