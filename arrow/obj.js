function createInstructor(firstName, lastName){
    return {
        firstName,
        lastName
    }
}

let favoriteNumber = 42;
let instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
}

let instructor = {
    firstName: "Colt",
    sayHi(){
        return "Hi!";
    },
    sayBye(){
        return this.firstName + " says bye!";
    }
}

function createAnimal(species, verb, noise){
    return {
        species,
        [verb](){
            return noise;
        }
    }
}