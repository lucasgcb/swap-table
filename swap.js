function swap(){
    let input = document.getElementById('input-box')
    let output = document.getElementById('output-box')
    let values = getSwapValues()    
    output.value = input.value
    for (const swapValue in values) {
        output.replace(swapValue[0], swapValue[1])
    }
}

function getSwapValues()
{
    let table = document.getElementById('swap-table');
    let swapValues = []
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length / 2; c < m; c++) {
            let fromValue = table.rows[r].cells[c].innerHTML
            let toValue = table.rows[r].cells[c+1].innerHTML
            swapPair = [fromValue,toValue]
            swapValues.push(swapPair);
        }
    }
    return swapValues
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

insert = document.getElementById('insert');
swap = document.getElementById('swap');
insert.addEventListener('click', insertSwapValue);
swap.addEventListener("click", swap);