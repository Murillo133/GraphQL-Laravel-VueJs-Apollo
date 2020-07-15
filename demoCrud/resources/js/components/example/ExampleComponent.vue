<template>
  <div class="container">
    <div class="form-group">
      <label for="animal">Animal's name</label>
      <input
        type="text"
        id="animal"
        class="form-control"
        placeholder="Enter Animal"

        v-model="animals2.name"
      />
    </div>
    <div class="form-group">
      <label for="color">Animal's color</label>
      <input
        type="color"
        class="form-control"
        placeholder="Enter color"
        id="color"
        v-model="animals2.color"
      />
    </div>
    <div class="form-group">
      <label for="weight">Animal's weight</label>
      <input
        type="number"
        class="form-control"
        placeholder="Enter weight"
        id="weight"
        v-model="animals2.weight"
      />
    </div>
    <button class="btn btn-success" @click="save()" v-if="showButtonSave">Save</button>
    <button class="btn btn-success" @click="editDb()" v-if="showButtonEdit">Edit</button>
    <div class="card-columns" v-if="animals">
      <div class="card" style="width: 18rem;"  v-for="(animal, index) in animals" v-bind:key="index">
        <div class="card-body">
          <h5 class="card-title">{{animal.name}}</h5>
          <p class="card-text">Color: {{animal.color}}</p>
          <p class="card-text">Weight: {{animal.weight}}</p>
          <button class="btn btn-danger" @click="eliminar(animal.id)">Delete</button>
          <button class="btn btn-success" @click="edit(animal)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_ANIMAL, DELETE_ANIMAL,UPDATE_ANIMAL } from "./mutations.js";
import { ANIMALS_QUERY } from "./queries.js";
export default {
    apollo: {
        animals: {
        query: ANIMALS_QUERY
        }

    },
    data() {
        return {
        animals2: {
            name: "",
            color: "#000000",
            weight: null
        },
        animalsEdit: {
            id: null,
            name: "",
            color: "#000000",
            weight: null
        },
        showButtonSave: true,
        showButtonEdit: false,
        };
    },
    methods: {
        edit(items) {
            this.showButtonSave = false;
            this.showButtonEdit = true;
            this.animals2.name = items.name;
            this.animals2.weight = items.weight;
            this.animals2.color = items.color;
            this.animalsEdit.id = items.id;
            this.animalsEdit.name = items.name;
            this.animalsEdit.weight = items.weight;
            this.animalsEdit.color = items.color;
        },
        async save() {
            const result = await this.$apollo.mutate({
                    mutation: CREATE_ANIMAL,
                    variables: {
                    input: this.animals2
                }
            });
            this.$apollo.queries.animals.refetch();
        },
        async editDb() {
            this.animalsEdit.name = this.animals2.name;
            this.animalsEdit.weight = this.animals2.weight;
            this.animalsEdit.color = this.animals2.color;

            const result = await this.$apollo.mutate({
                mutation: UPDATE_ANIMAL,
                variables: {
                    input: this.animalsEdit
                }
            });
            console.log(result);
            this.$apollo.queries.animals.refetch();
        },
        async eliminar(id) {
        const result = await this.$apollo.mutate({
            mutation: DELETE_ANIMAL,
            variables: {
            id: id
            }
        });
        this.$apollo.queries.animals.refetch();
        }
    },
    created() {
        this.$apollo.queries.animals.refetch();
    },
    mounted() {
        console.log("Component mounted.");
        this.$apollo.queries.animals.refetch();
        console.log(this.animals);
    }
    };
</script>