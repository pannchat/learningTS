let name1 = "kim";
let name2 : string = "park";
// name2 = 123;

// let arr : string[] = [123, 'park'];
let obj : { name : string } = {name : 'park'}
let name3 : string | number = 'park'

type MyType = string | number;
let name4 : MyType = 123;

function func(x : number) : number{
    return x*2;
}

// type Member = [number, boolean];
// let john:Member = [123,true];

type Member = {
    name : string
}

let john : Member = {
    name : 'kim'
}

class User{
    name :string ;
    constructor(name :string ){
        this.name = name;
    }
}