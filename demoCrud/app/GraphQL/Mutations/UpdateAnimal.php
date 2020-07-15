<?php

namespace App\GraphQL\Mutations;

use App\Animal;

class UpdateAnimal
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $animal = Animal::where("id", $args["id"])->first();
        $animal->name = $args["name"];
        $animal->color = $args["color"];
        $animal->weight = $args["weight"];  
        $animal->update();
        return $animal;
    }
}
