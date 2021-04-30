<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ONU extends Model
{
    use HasFactory;

    protected $table = 'onus';

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function olts()
    {
        return $this->belongsToMany(OLT::class, 'olt_menu');
    }
}
