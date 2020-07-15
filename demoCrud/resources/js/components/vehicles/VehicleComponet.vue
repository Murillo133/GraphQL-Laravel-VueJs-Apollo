<template>
    <div class="container">
    <br>
    <h1>Vehicles CRUD</h1>
        <div class="form-group">
            <label for="brand">Brand</label>
            <input
                type="text"
                id="brand"
                class="form-control"
                placeholder="Enter brand"
                v-model="vehicles2.brand"
            />
        </div>

        <div class="form-group">
            <label for="color">Color</label>
            <input
                type="color"
                class="form-control"
                placeholder="Enter color"
                id="color"
                v-model="vehicles2.color"
            />
        </div>
        <div class="form-group">
            <label for="plate">Plate</label>
            <input
                type="text"
                class="form-control"
                placeholder="Enter Plate"
                id="plate"
                v-model="vehicles2.plate"
            />
        </div>
            <div class="form-group">
            <label for="model">model</label>
            <input
                type="text"
                class="form-control"
                placeholder="Enter Model"
                id="model"
                v-model="vehicles2.model"
            />
        </div>
        
        <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="allTerrain" name="terrain"checked>
        <label class="custom-control-label" for="allTerrain">4x4</label>
        </div>
        <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="2x2" name="terrain" >
        <label class="custom-control-label" for="2x2">2x2</label>
        </div>
        <br>

        <button class="btn btn-success" @click="save()" v-if="showButtonSave">
            Save
        </button>
        <button class="btn btn-success" @click="editDb()" v-if="showButtonEdit">
            Edit
        </button>
        <div class="card-columns" v-if="vehicles">
            <div
                class="card"
                style="width: 18rem;"
                v-for="(vehicle, index) in vehicles"
                v-bind:key="index">
                <div class="card-body">
                    <h5 class="card-title">{{ vehicle.brand }}</h5>
                    <p class="card-text">Color: {{ vehicle.color }}</p>
                    <p class="card-text">Plate: {{ vehicle.plate }}</p>
                    <p class="card-text">Model: {{ vehicle.model }}</p>

                    <p class="card-radio">All Terrain: {{ vehicle.allTerrain }}</p>

                    <button class="btn btn-danger" @click="eliminar(vehicle.id)">
                        Delete
                    </button>
                    <button class="btn btn-success" @click="edit(vehicle)">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CREATE_VEHICLE, DELETE_VEHICLE, UPDATE_VEHICLE } from "./mutations.js";
import { VEHICLES_QUERY } from "./queries.js";
export default {

    apollo: {
        vehicles: {
            query: VEHICLES_QUERY
        }
    },
    data() {
        return {
            vehicles2: {
                brand: "",
                color: "#000000",
                plate: "",
                model: "",
                allTerrain: false
            },
            vehiclesEdit: {
                id: null,
                brand: "",
                color: "#000000",
                plate: "",
                model: "",
                allTerrain: false
            },

            showButtonSave: true,
            showButtonEdit: false
        };
    },
    methods: {
        edit(items) {
            this.showButtonSave = false;
            this.showButtonEdit = true;
            this.vehicles2.brand = items.brand;
            this.vehicles2.color = items.color;
            this.vehicles2.plate = items.plate;
            this.vehicles2.model = items.model;
            this.vehicles2.allTerrain = items.allTerrain;

            this.vehiclesEdit.id = items.id;
            this.vehiclesEdit.brand = items.brand;
            this.vehiclesEdit.color = items.color;
            this.vehiclesEdit.plate = items.plate;
            this.vehiclesEdit.model = items.model;
            this.vehiclesEdit.allTerrain = items.allTerrain;


        },
        async save() {
            const result = await this.$apollo.mutate({
                mutation: CREATE_VEHICLE,
                variables: {
                    input: this.vehicles2
                }
            });
            this.$apollo.queries.vehicles.refetch();
        },
        async editDb() {
            this.vehiclesEdit.brand = this.vehicles2.brand;
            this.vehiclesEdit.color = this.vehicles2.color;
            this.vehiclesEdit.plate = this.vehicles2.plate;
            this.vehiclesEdit.model = this.vehicles2.model;
            this.vehiclesEdit.allTerrain = this.vehicles2.allTerrain;


            const result = await this.$apollo.mutate({
                mutation: UPDATE_VEHICLE,
                variables: {
                    input: this.vehiclesEdit
                }
            });
            console.log(result);
            this.$apollo.queries.vehicles.refetch();
        },
        async eliminar(id) {
            const result = await this.$apollo.mutate({
                mutation: DELETE_VEHICLE,
                variables: {
                    id: id
                }
            });
            this.$apollo.queries.vehicles.refetch();
        }
    },
    created() {
        this.$apollo.queries.vehicles.refetch();
    },
    mounted() {
        console.log("Component mounted.");
        this.$apollo.queries.vehicles.refetch();
        console.log(this.vehicles);
    }
};
</script>
