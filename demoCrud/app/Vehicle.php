<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    
    protected $fillable = ["id", "brand","color","plate","model","allTerrain"];
}
