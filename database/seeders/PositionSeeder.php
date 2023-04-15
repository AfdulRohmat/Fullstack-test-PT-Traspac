<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('positions')->insert([
            ['name' => "Kepala Sekretariat Utama"],
            ['name' => "Penyusun Laporan Keuangan"],
            ['name' => "Surveyor Pemetaan Utama"],
            ['name' => "Analis Data Survey dan Pemetaan"],
            ['name' => "Perancang Per-UU-an Utama IV/e"],
            ['name' => "Kepala Biro Perencanaan, Kepegawaian dan Hukum"],
            ['name' => "Widyaiswara Utama IV/e"],
            ['name' => "Analis Kepegawaian Madya IV/b"],
            ['name' => "Kepala Sub Bidang Kerjasama dan Pelayanan Riset, DKP"],
            ['name' => "Analis Hukum"],
            ['name' => "Peneliti Pertama III/b"],
            ['name' => "Surveyor Pemetaan Muda"],
            ['name' => "Analis Jabatan"],
            ['name' => "Kepala Subbag Kepegawaian"],
        ]);
    }
}
