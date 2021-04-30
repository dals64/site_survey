<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BST extends Model
{
    protected $table = 'bsts';

    use HasFactory;

    public function pops(){
        $this->hasMany(POP::class);
    }

    public function radio()
    {
        return $this->belongsTo(Radio::class);
    }

}
