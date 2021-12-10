document.addEventListener('DOMContentLoaded', renderMonsters)

function renderMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(res => res.json())
    .then(data => data.forEach( monster => {
        let monsterDiv = document.createElement('div')
        monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age:${monster.age}</h4>
            <p>Bio:${monster.description}</p>
        `
        document.querySelector('#monster-container').appendChild(monsterDiv)
    })
    )

    const monsterForm = document.createElement('form')
    monsterForm.setAttribute('id', 'monster-form')
    //console.log(monsterForm)
    document.querySelector('#create-monster').appendChild(monsterForm)
    monsterForm.innerHTML = `
        <input id='name' placeholder='name'>
        <input id='age' placeholder='age'>
        <input id='description' placeholder='description'>
        <button id='monster-button'>
        Create Monster
        </button>
    `
    const createButton = document.querySelector('#monster-button')
    //console.log(createButton)
    monsterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let monstObj = { 
        name : e.target.name.value,
        age : e.target.age.value,
        description : e.target.description.value
        }

        console.log(monstObj)

        newMonster(monstObj)
        postAnimal(monstObj)
    })
    
    function newMonster(monstObj){
        const monstContainer = document.querySelector('#monster-container')
        //console.log(monstContainer)
        let newMonster = document.createElement('div')
        newMonster.innerHTML = `
        <h2>${monstObj.name}</h2>
        <h4>Age:${monstObj.age}</h4>
        <p>Bio:${monstObj.description}</p>
    `
    monstContainer.appendChild(newMonster)
    }

    function postAnimal(monstObj){
        fetch('http://localhost:3000/monsters',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: monstObj.name, age: monstObj.age, description: monstObj.description
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    const nextButton = document.querySelector('#forward')
    //console.log(nextButton)
    let page = 1
    nextButton.addEventListener('click', nextMonsters)
    
        function nextMonsters() {

           const monsterDiv =  document.querySelector('#monster-container')
           monsterDiv.innerHTML = ''
            page++
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(data => data.forEach( monster => {
            let monsterDiv = document.createElement('div')
            monsterDiv.innerHTML = `
                <h2>${monster.name}</h2>
                <h4>Age:${monster.age}</h4>
                <p>Bio:${monster.description}</p>
            `
            document.querySelector('#monster-container').appendChild(monsterDiv)
        })
    )}

    
}

