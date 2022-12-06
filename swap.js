function swapValues() {
    let input = document.getElementById('input-box')
    let output = document.getElementById('output-box')
    let pairs = getSwapPairs()
    output.value = input.value
    pairs.forEach(function (swapValue) {
        console.log(swapValue)
        output.value = output.value.replaceAll(swapValue[0], swapValue[1])
    })
}

function checkStorageAndLoad(){
    storageTablePairs = getTable()
    if (storageTablePairs)
        loadTable(storageTablePairs)
}


function setTable() {
    let pairs = getSwapPairs()
    pairsJSON = JSON.stringify(pairs)
    localStorage.setItem('table', pairsJSON)
}


function getTable() {
    pairsJSON = localStorage.getItem('table')
    pairs = JSON.parse(pairsJSON)
    return pairs
}

function removePair(rowId) {
    var row = document.getElementById(rowId);
    row.parentNode.removeChild(row);
}

function deleteTable() {
    let table = document.getElementById('swap-table');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        table.deleteRow(0)
    }
}

function getSwapPairs() {
    let table = document.getElementById('swap-table');
    let swapPairs = []
    for (var r = 0, n = table.rows.length; r < n; r++) {
        let fromValue = table.rows[r].cells[0].innerHTML
        let toValue = table.rows[r].cells[1].innerHTML
        swapPair = [fromValue, toValue]
        swapPairs.push(swapPair);
    }
    return swapPairs
}

function loadTable(pairs) {
    let table = document.getElementById('swap-table');
    deleteTable()
    pairs.forEach(function (pair) {
        let input = pair[0]
        let output = pair[1]
        insertRow(input, output, table)
    })
}

function firstCharacterIsInArray(arrayToCheck,arrayOfArrays){
    exists = false
    arrayToCheckString = arrayToCheck[0]
    arrayOfArrays.forEach(function (array) {
        arrayThatExistsString = array[0]
        if (arrayToCheckString == arrayThatExistsString)
            exists = true
    })
    return exists
}

function arrayIsInArray(arrayToCheck,arrayOfArrays){
    exists = false
    arrayToCheckString = arrayToCheck.join()
    arrayOfArrays.forEach(function (array) {
        arrayThatExistsString = array.join()
        if (arrayToCheckString == arrayThatExistsString)
            exists = true
    })
    return exists
}

function insertSwapValue() {
    let table = document.getElementById('swap-table');
    let input = document.getElementById('from-value').value
    let output = document.getElementById('to-value').value
    checkPair = [input, output]
    checkInversePair = [output, input]
    currentPairs = getSwapPairs()
    if (arrayIsInArray(checkPair, currentPairs))
    {
        Swal.fire(`Entry already exists: ${checkPair.join('->')}`)
        return 
    }
    if (firstCharacterIsInArray(checkPair, currentPairs))
    {
        Swal.fire(`Entry already exists for: ${checkPair[0]}`)
        return
    }
    if (arrayIsInArray(checkInversePair, currentPairs))
    {
        Swal.fire(`Inverse of entry already exists: ${checkPair.join('->')}`)
        return 
    }
    insertRow(input, output, table)
}

function insertRow(input, output, table) {
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    buttonClass = "btn-primary table-button"
    row.id = Date.now()
    cell1.className = "swap-cell"
    cell2.className = "swap-cell"
    cell3.className = "swap-cell"
    cell1.innerHTML = input;
    cell2.innerHTML = output;
    cell3.innerHTML = '<button onclick=removePair(' + row.id + ') class=' + buttonClass + '>Delete</button>'
}

function checkChanges(event) {
    currentTable = getSwapPairs()
    storageTable = getTable()
    if (currentTable.join() != storageTable.join()) {
        event.preventDefault();
        event.returnValue = '';
    }
}

saveButton = document.getElementById('save-button');
loadButton = document.getElementById('load-button');
removeButton = document.getElementById('example-remove');
insertButton = document.getElementById('insert-button');
swapButton = document.getElementById('swap-button');
insertButton.addEventListener('click', insertSwapValue);
removeButton.addEventListener('click', function () { removePair('row-0') })
swapButton.addEventListener("click", swapValues);
saveButton.addEventListener("click", setTable);
loadButton.addEventListener("click", function () { loadTable(getTable()) });
window.addEventListener('beforeunload', checkChanges);
window.addEventListener('onload', checkStorageAndLoad);