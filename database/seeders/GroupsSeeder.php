<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('groups')->insert([
            ['name' => "IA"],
            ['name' => "IB"],
            ['name' => "IC"],
            ['name' => "ID"],
            ['name' => "IIA"],
            ['name' => "IIB"],
            ['name' => "IIC"],
            ['name' => "IID"],
            ['name' => "IIIA"],
            ['name' => "IIIB"],
            ['name' => "IIIC"],
            ['name' => "IIID"],
            ['name' => "IVA"],
            ['name' => "IVB"],
            ['name' => "IVC"],
            ['name' => "IVD"],
            ['name' => "IVE"],
        ]);
    }
}
