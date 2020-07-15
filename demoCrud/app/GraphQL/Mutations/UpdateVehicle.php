<?php

namespace App\GraphQL\Mutations;

use App\Vehicle;

class UpdateVehicle
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $vehicle = Vehicle::where("id", $args["id"])->first();
        $vehicle->brand = $args["brand"];
        $vehicle->color = $args["color"];
        $vehicle->plate = $args["plate"];
        $vehicle->model = $args["model"];
        $vehicle->allTerrain = $args["allTerrain"];
        $vehicle->update();
        return $vehicle;
    }
}
