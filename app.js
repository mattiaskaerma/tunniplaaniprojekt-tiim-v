let groupDict = {}
let weeksDict = {}
const currentWeek = 8
const groups = document.querySelector('#groups')
const groupNames = document.querySelector('#groupNames')
const timetable = document.querySelector('.timetable')
const container = document.querySelector('.container')
let groupId = 3148



fetch('https://be.ta19heinsoo.itmajakas.ee/api/groups').then(response => {
    return response.json()
}).then(data => {
    data.forEach(group => {
        groupDict[group.groupCode] = group.groupId

    });
})

fetch('https://be.ta19heinsoo.itmajakas.ee/api/weeks/' + currentWeek).then(response => {
    return response.json()
}).then(data => {
    console.log(data)
    console.log(data.start)

    let newBox = document.createElement('div')
    newBox.classList.add("days")
    newBox.innerHTML = `
        <button  value="2020-10-26T00:00:00Z"  class="monday">E</button>
        <button value="2020-10-27T00:00:00Z" class="tuesday">T</button>
        <button value="2020-10-28T00:00:00Z" onclick="location.href='index2.html'" class="wednesday">K</button>
        <button value="2020-10-29T00:00:00Z" onclick="location.href='index.html'" class="thursday">N</button>
        <button onclick=something() value="2020-10-30T00:00:00Z" onclick="location.href='index4.html'" class="friday">R</button>`
    container.appendChild(newBox)
})


fetch('https://be.ta19heinsoo.itmajakas.ee/api/lessons/groups=' + groupId + '&weeks=8').then(response => {
    return response.json()
}).then(data => {
    console.log(data)
    console.log(data.timetableEvents)
    data.timetableEvents.forEach(el => {
        console.log(el)
        function dosomething() {
            let newLesson = document.createElement('div')
            newLesson.classList.add("tund")
            newLesson.innerHTML = `<div class="leftside">
        <span class="aeg">${el.timeStart} - ${el.timeEnd}</span>
        <span class="pealkiri">${el.nameEn}</span>
        <span class="op">${el.teachers[0].name}</span>
    </div>
    <div class="rightside">
    </div>
    <div class="side">
    <span class="ruum">${el.rooms[0].roomCode}</span>
    </div>`
            timetable.appendChild(newLesson)
        }
        if (el.date == "2020-10-29T00:00:00Z") {
            dosomething()
        }

    })
})


groups.addEventListener('change', event => {
    selectedElement = event.target.value
    getLessons(selectedElement)
})
