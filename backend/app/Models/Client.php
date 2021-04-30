<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function router(){
        return $this->belongsTo(Router::class);
    }

    public function radio(){
        return $this->belongsTo(Radio::class);
    }

    public function onus(){
        return $this->hasMany(ONU::class);
    }

    public function pops()
    {
        return $this->hasMany(POP::class);
    }
}
