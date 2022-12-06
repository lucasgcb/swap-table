function swapValues(){
    let input = document.getElementById('input-box')
    let output = document.getElementById('output-box')
    let pairs = getSwapPairs()    
    output.value = input.value
    pairs.forEach(function(swapValue) {
      console.log(swapValue)
      output.value = output.value.replaceAll(swapValue[0], swapValue[1])
    })
}

function removePair(rowId)
{
    var row = document.getElementById(rowId);
    row.parentNode.removeChild(row);
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
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    buttonClass = "btn-primary"
    row.id = Date.now()
    cell1.className = "first-cell"
    cell1.innerHTML = input;
    cell2.innerHTML = output;
    cell3.innerHTML = '<button onclick=removePair(' + row.id + ') class=' + buttonClass + '>Delete</button>'
}


removeButton = document.getElementById('example-remove');
insertButton = document.getElementById('insert-button');
swapButton = document.getElementById('swap-button');
insertButton.addEventListener('click', insertSwapValue);
removeButton.addEventListener('click', function() {removePair('row-0')})
swapButton.addEventListener("click", swapValues);
