let myName : string = "jiwon";
let myAge : number = 25;

let singer : {title:string, name:string} = {
    name:'frank sinatra',
    title : 'newyork'
}

let project :{member:string[],days:number, started:boolean} = {
    member : ['kim','park'],
    days : 30,
    started:true
}

let user :string = 'kim';
let age :number|undefined = undefined;
let married :boolean = false; 
let 철수 :(string|boolean|undefined|number)[] = [user, age, married];

let 학교 :{
    score : (number|boolean)[],
    teacher : string,
    friend : string|string[]
} = {
    score : [100, 97, 84],
    teacher : 'Phil',
    friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]