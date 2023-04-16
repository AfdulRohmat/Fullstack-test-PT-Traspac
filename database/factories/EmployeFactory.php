<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employe>
 */
class EmployeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nip' => fake()->randomNumber($nbDigits = NULL),
            'fullname' => fake()->name(),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->dateTimeBetween($startDate = '-30 years', $endDate = 'now', $timezone = null),
            'jenis_kelamin' => fake()->randomElement(['L', 'P']),
            'alamat' => fake()->address(),
            'picture' => fake()->imageUrl(640, 480),
            'no_HP' => fake()->phoneNumber(),
            'npwp' => fake()->randomNumber($nbDigits = NULL),
            'group_id' =>  fake()->numberBetween(1, 17),
            'echelon_id' =>  fake()->numberBetween(1, 5),
            'position_id' =>    fake()->numberBetween(1, 14),
            'tempat_tugas' => fake()->city(),
            'religion_id' =>  fake()->numberBetween(1, 6),
            'work_unit_id' =>  fake()->numberBetween(1, 9),
        ];
    }
}
