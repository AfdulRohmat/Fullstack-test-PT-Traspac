<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'fullname',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'picture',
        'no_HP',
        'npwp',
        'group_id',
        'echelon_id',
        'position_id',
        'tempat_tugas',
        'religion_id',
        'work_unit_id',
    ];

    /**
     * Get the user that owns the Employe
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id', 'id');
    }

    /**
     * Get the echelon that owns the Employe
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function echelon(): BelongsTo
    {
        return $this->belongsTo(Echelon::class, 'echelon_id', 'id');
    }

    /**
     * Get the position that owns the Employe
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }

    /**
     * Get the religion that owns the Employe
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function religion(): BelongsTo
    {
        return $this->belongsTo(Religion::class, 'religion_id', 'id');
    }

    /**
     * Get the work_unit that owns the Employe
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function work_unit(): BelongsTo
    {
        return $this->belongsTo(Work_unit::class, 'work_unit_id', 'id');
    }
}
