<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POP extends Model
{
    use HasFactory;

    protected $table = 'pops';

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function bst()
    {
        return $this->belongsTo(BST::class);
    }

    public function olt()
    {
        return $this->belongsTo(OLT::class);
    }

}
