<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OLT extends Model
{
    use HasFactory;

    protected $table = 'olts';

    public function pops()
    {
        return $this->hasMany(POP::class);
    }

    public function onus()
    {
        return $this->belongsToMany(ONU::class, 'olt_menu');
    }
}
