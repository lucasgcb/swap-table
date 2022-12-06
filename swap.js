function swapValues(){
    let input = document.getElementById('input-box')
    let output = document.getElementById('output-box')
    let pairs = getSwapPairs()    
    output.value = input.value
    for (const swapValue in values) {
        output.replace(swapValue[0], swapValue[1])
    }
}

function getSwapPairs()
{
    let table = document.getElementById('swap-table');
    let swapPairs = []
    for (var r = 0, n = table.rows.length; r < n; r++) {
        let fromValue = table.rows[r].cells[0].innerHTML
        let toValue = table.rows[r].cells[1].innerHTML
        swapPair = [fromValue,toValue]
        swapPairs.push(swapPair);
    }
    return swapPairs
}

function insertSwapValue(){
    let table = document.getElementById('swap-table');
    let input = document.getElementById('from-value').value
    let output = document.getElementById('to-value').value
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = input;
    cell2.innerHTML = output;
}

insertButton = document.getElementById('insert-button');
swapButton = document.getElementById('swap-button');
insertButton.addEventListener('click', insertSwapValue);
swapButton.addEventListener("click", swapValues);
