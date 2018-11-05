var size = 100;
var px = 7;
var border = 0;
var generationNumber = 0;
var cellsA = [];
var cellsB = [];

function random(n) {
    for (var i = 0; i < n; i++) {
        var rowA = [];
        var rowB = [];
        for (var j = 0; j < n; j++) {
            var r = 0;
            if ((i > border) && (i < n - border) && (j > border) && (j < n - border)) {
                r = Math.round(Math.random());
            }
            rowA.push(r);
            rowB.push(r);
        }
        cellsA.push(rowA);
        cellsB.push(rowB);
    }
}

function tableCreate() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    for(var i = 0; i < cellsA.length; i++) {
        var tr = document.createElement('tr');
        tr.style.height = px + "px";
        for (var j = 0; j < cellsA[i].length; j++) {
            var td = document.createElement('td');
            if (cellsA[i][j] === 1) {
                td.style.backgroundColor = "#24B527";
            } else {
                td.style.backgroundColor = "#000000";
            }
            td.style.width = px + "px";
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    body.appendChild(tbl)
}

function snapshot() {
    for (var i = 0; i < cellsA.length; i++) {
        for (var j = 0; j < cellsA[i].length; j++) {
            cellsB[i][j] = cellsA[i][j];
        }
    }
}

function getValue(i, j, n) {
    if (i === -1) {
        i = n-1;
    } else if (i === n) {
        i = 0;
    }
    if (j === -1) {
        j = n-1;
    } else if (j === n) {
        j = 0;
    }
    return cellsB[i][j];
}

function evolute(n) {
    for (var i = 0; i < cellsB.length; i++) {
        for (var j = 0; j < cellsB[i].length; j++) {
            var sum = getValue(i-1,j, n) + getValue(i-1, j+1, n) + getValue(i, j+1, n) + getValue(i+1, j+1, n) + getValue(i+1, j, n) + getValue(i+1, j-1, n) + getValue(i, j-1, n) + getValue(i-1,j-1, n);
            if ((sum < 2) || (sum > 3)) {
                cellsA[i][j] = 0;
            } else if (sum === 3) {
                cellsA[i][j] = 1;
            }
        }
    }
}

function makeEvolutionStep() {
    snapshot();
    evolute(size);
    generationCount();
    timeCount();
    speedCount ();
    removeTable();
    tableCreate();
}

function removeTable() {
    var elem = document.getElementsByTagName('table')[0];
    elem.parentNode.removeChild(elem);
    return false;
}

function startEvolution (){
    startTime = new Date().getTime();
    setInterval(makeEvolutionStep, 1);
}

function generationCount() {
    $("#counter").val("Number of generation -> " + ++generationNumber);
}

function timeCount() {
    nowTime = new Date().getTime();
    timeFromStart = nowTime - startTime;
    $ ("#timeCount").val("Time from start -> " + timeFromStart/1000 + " seconds");
}

function speedCount() {
    speed = generationNumber/timeFromStart;
    $ ("#speedCount").val("Speed of simulation -> " + speed*1000 + " generations in second");
}

random(size);
tableCreate();

// изменение цвета от кол-ва поколений
// алгоритм
// НОРМАЛЬНОЕ управлене
// управление скоростью
// нерандомный рандом
// кнопка reset
// настраивать поле
// рефактор