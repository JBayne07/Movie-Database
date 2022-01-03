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
        let person2 = {}
        person.name = movieData[i].Director[j];
        person.directed = movieData[i].Title;
        person2.name = movieData[i].Director[j];

        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }

        people.push(person);
        totalPeople.push(person2);
    }

    for(let j = 0; j < movieData[i].Writer.length; ++j){
        let person = {};
        let person2 = {}
        person.name = movieData[i].Writer[j];
        person.written = movieData[i].Title;
        person2.name = movieData[i].Writer[j];

        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
              
        people.push(person);
        totalPeople.push(person2);
    }

    for(let j = 0; j < movieData[i].Actors.length; ++j){
        let person = {};
        let person2 = {}
        person.name = movieData[i].Actors[j];
        person.acted = movieData[i].Title;
        person2.name = movieData[i].Actors[j];

        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
        
        people.push(person);
        totalPeople.push(person2);
    }

    
    
    for(let j = 0; j < people.length; ++j){
        let map = new Map();
        // let map2 = new Map();
        for(let k = 0; k < people.length; ++k){
            if(j === k){
                continue;
            }

            map.set(people[k].name, 1);
            // map2.set(totalPeople[k].name, 1);
        }
        // console.log(map2);
        people[j].collaborated = map;
        // totalPeople[j].collaborated = map2;
    }

    for(let j = totalPeople.length-people.length; j < totalPeople.length; ++j){
        let map2 = new Map();
        for(let k = totalPeople.length-people.length; k < totalPeople.length; ++k){
            if(j === k){
                continue;
            }
            map2.set(totalPeople[k].name, 1);
        }
        totalPeople[j].collaborated = map2
    }

    // console.log(totalPeople);

    if(flag){
        for(let j = 0; j < multiPeople.length; ++j){
            let multiArr = [];
            let otherArr = [];
            
            for(let k = 0; k < totalPeople.length; ++k){
                if(totalPeople[k].name === multiPeople[j].name){
                    const iterator = totalPeople[k].collaborated.keys();
                    let temp = {};

                    temp.name = totalPeople[k].name;
                    temp.collaborated = new Map();

                    for(let l = 0; l < totalPeople[k].collaborated.size; ++l){
                        const value = iterator.next().value
                        temp.collaborated.set(value,totalPeople[k].collaborated.get(value))
                    }

                    multiArr.push(temp);
                    // console.log('\n\n');
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
            let merged = multiArr[0].collaborated;
            // console.log multiArr);
            for(let k = 1; k < multiArr.length; ++k){
                multiArr[k].collaborated.forEach((value, key) =>{
                    // console.log('------------------',key,merged);
                    if(merged.has(key)){
                        merged.set(key, merged.get(key)+1);
                    }else{
                        merged.set(key, value);
                    }                    
                });
            }

            let sortedMap = new Map([...merged.entries()].sort((a,b) => b[1] -a[1]));
            // console.log(sortedMap);
            let topFive = Array.from(sortedMap).slice(0,5);
            let topFiveMap = new Map(topFive);
            let topFiveArr = [];

            const iterator = topFiveMap.keys();
            let value = iterator.next().value;
            while(value !== undefined){
                topFiveArr.push(value);
                value = iterator.next().value
            }

            for(let k = 0; k < people.length; ++k){
                if(people[k].name === multiArr[0].name){
                    people[k].collaborated = topFiveArr;
                }
            }
        }
    }

    for(let j = 0; j < people.length; ++j){
        if(!(multiPeople.some(element => element.name === people[j].name))){
            let sortedMap = new Map([...people[j].collaborated.entries()].sort((a,b) => b[1] -a[1]));
            let topFive = Array.from(sortedMap).slice(0,5);
            let topFiveMap = new Map(topFive);
            let topFiveArr = [];
            const iterator = topFiveMap.keys();
            let value = iterator.next().value;
            while(value !== undefined){
                topFiveArr.push(value);
                value = iterator.next().value
            }
            people[j].collaborated = topFiveArr;
        }
    }
    

    

    console.log('\n\n',flag);
    console.log(people);
    // console.log(totalPeople);
    // console.log(multiPeople);
    flag = false;

    
    const options = {
        url: 'http://localhost:9000/api/movies',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            data:{
                title       : movieData[i].Title,
                releaseYr   : movieData[i].Year,
                rated       : movieData[i].Rated,
                releaseDate : movieData[i].Released,
                runtime     : movieData[i].Runtime,
                plot        : movieData[i].Plot,
                awards      : movieData[i].Awards,
                poster      : movieData[i].Poster,
                genres      : movieData[i].Genre,
                directors   : movieData[i].Director,
                writers     : movieData[i].Writer,
                actors      : movieData[i].Actors,
                peopleArr   : people
            }
    }

    axios(options).then(response => {
        console.log(response.data);
        console.log('All Done!');
    });
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