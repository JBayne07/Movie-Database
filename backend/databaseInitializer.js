const movieData = require('./movie-data-10.json');
const axios = require('axios');
let totalPeople = [];
// let people = [];

let flag = false;

for(let i = 0; i < 3; i++){
    // console.log(movieData[i]);
    movieData[i].Year = parseInt(movieData[i].Year)
    movieData[i].Runtime = parseInt(movieData[i].Runtime)

    let people = [];
    let multiPeople = [];

    for(let j = 0; j < movieData[i].Director.length; ++j){
        let person = {};
        let temp = {}
        person.name = movieData[i].Director[j];
        temp.name = movieData[i].Director[j];

        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }

        people.push(person);
        totalPeople.push(person);
    }

    for(let j = 0; j < movieData[i].Writer.length; ++j){
        let person = {};
        let temp = {}
        person.name = movieData[i].Writer[j];
        temp.name = movieData[i].Writer[j];

        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
              
        people.push(person);
        totalPeople.push(person);
    }

    for(let j = 0; j < movieData[i].Actors.length; ++j){
        let person = {};
        let temp = {}
        person.name = movieData[i].Actors[j];
        temp.name = movieData[i].Actors[j];

        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
        
        
        people.push(person);
        totalPeople.push(person);
    }

    
    
    for(let j = 0; j < people.length; ++j){
        let map = new Map();
        for(let k = 0; k < people.length; ++k){
            if(j === k){
                continue;
            }

            map.set(people[k].name, 1);
        }
        people[j].collaborated = map;
    }



    if(flag){
        for(let j = 0; j < multiPeople.length; ++j){
            let topFiveMap = new Map();
            let tempArr = [];
            
            for(let k = 0; k < totalPeople.length; ++k){
                if(totalPeople[k].name === multiPeople[j].name){
                    tempArr.push(Object.assign({},totalPeople[k]));
                    // tempArr.push(totalPeople[k]);

                    // let temp = totalPeople[k].collaborated;
                    // for(let l = 0; l < totalPeople[k].collaborated.length; ++l){
                    //     if(arr.length < 5){
                    //         arr.push(totalPeople[k].collaborated[l]);
                    //     }else{
                    //         let arrCount = 0;
                    //         for(let p = 0; p < totalPeople[k].collaborated.length; ++p){
                    //             if(totalPeople[k].collaborated[l] === totalPeople[k].collaborated[p]){
                    //                 totalPeople[k].collaborated.get(totalPeople[k].name)++;
                    //             }
                    //             console.log(k,totalPeople[k].collaborated[l],totalPeople[k].collaborated[p]);
                    //         }
                    //         temp.set(totalPeople[k].collaborated[l], arrCount);
                    //     }
                    // }
                    // console.log(temp);
                }
            }
            //problem is the map is being sent by reference each time need to figure out a way to deep copy
            let merged = tempArr[0].collaborated;
            console.log(tempArr);
            for(let k = 1; k < tempArr.length; ++k){
                tempArr[k].collaborated.forEach((value, key) =>{
                    // console.log('------------------',key,merged);
                    if(merged.has(key)){
                        merged.set(key, merged.get(key)+1);
                    }else{
                        merged.set(key, value);
                    }                    
                });
            }
            
            

            console.log(merged);


            // console.log(arr);          
        }
    }
    

    

    console.log(flag);
    // console.log(people);
    // console.log(totalPeople);
    // console.log(multiPeople);
    flag = false;

    
    // const options = {
    //     url: 'http://localhost:9000/api/movies',
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json;charset=UTF-8'
    //         },
    //         data:{
    //             title       : movieData[i].Title,
    //             releaseYr   : movieData[i].Year,
    //             rated       : movieData[i].Rated,
    //             releaseDate : movieData[i].Released,
    //             runtime     : movieData[i].Runtime,
    //             plot        : movieData[i].Plot,
    //             awards      : movieData[i].Awards,
    //             poster      : movieData[i].Poster,
    //             genres      : movieData[i].Genre,
    //             directors   : movieData[i].Director,
    //             writers     : movieData[i].Writer,
    //             actors      : movieData[i].Actors,
    //             peopleArr   : people
    //         }
    // }

    // axios(options).then(response => {
    //     console.log(response.data);
    //     console.log('All Done!');
    // });
}

// const options = {
//     url: 'http://localhost:9000/api/movies/61caf47d0853ecb4515e87ec',
//         method: 'GET',
//         headers: {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json;charset=UTF-8'
//         }
//     }

// axios(options).then(response => {
//     console.log(response.data);
// });