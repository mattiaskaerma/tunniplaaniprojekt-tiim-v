let groupDict = {}
let weeksDict = {}
const currentWeek = 9
const groups = document.querySelector('#groups')
const groupNames = document.querySelector('#groupNames')
const timetable = document.querySelector('.timetable')
const container = document.querySelector('.container')
let groupId = 3148



fetch('https://be.ta19heinsoo.itmajakas.ee/api/groups').then(response => {
    return response.json()
}).then(data => {
    data.forEach(group => {
        groupDict[group.groupId] = group.groupCode
        let newDiv = document.createElement("option")
        newDiv.value = group.groupId
        newDiv.innerHTML = groupDict[group.groupId]
        groups.appendChild(newDiv)

    });
})

fetch('https://be.ta19heinsoo.itmajakas.ee/api/weeks/' + currentWeek).then(response => {
    return response.json()
}).then(data => {
    console.log(data)
    console.log(data.start)
    list = data.start.split('T')
    list2 = list[0].split('-')
    console.log(list2[2])
    x = parseInt(list2[1])
    list3 = []
    for (let x = 0; x < 8; x++) {
        const element = list3[x];
        console.log(element)

    }
    let newBox = document.createElement('div')
    newBox.classList.add("days")
    newBox.innerHTML = `
        <button value=${parseInt(list2[2])} class="monday">E</button>
        <button value=${parseInt(list2[2]) + 1} class="tuesday">T</button>
        <button value=${parseInt(list2[2]) + 2} class="wednesday">K</button>
        <button value=${parseInt(list2[2]) + 3} class="thursday">N</button>
        <button value=${parseInt(list2[2]) + 4} class="friday">R</button>
`
    container.appendChild(newBox)
})


fetch('https://be.ta19heinsoo.itmajakas.ee/api/lessons/groups=' + groupId + '&weeks=9').then(response => {
    return response.json()
}).then(data => {
    console.log(data)
    console.log(data.timetableEvents)
    data.timetableEvents.forEach(el => {
        let newLesson = document.createElement('div')
        newLesson.classList.add("tund")
        newLesson.innerHTML = `<div class="leftside">
        <span class="aeg">${el.timeStart} - 14.15</span>
        <span class="pealkiri">${el.nameEn}</span>
        <span class="op">${el.teachers[0].name}</span>
    <span class="tunninr"></span>
    </div>
    <div class="rightside">
    </div>
    <div class="side">
        <span class="ruum">${el.rooms[0].roomCode}</span>
    </div>`
        timetable.appendChild(newLesson)
    })
})



function datetime() {
}


console.log(groupDict)
console.log(weeksDict)


groups.addEventListener('change', event => {
    selectedElement = event.target.value
    getLessons(selectedElement)
})
