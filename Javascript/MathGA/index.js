const index = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const key = [
    [3,2],
    [8,5]
]

function toSequence(matrix){
    if(!matrix){return console.log("No Matrix given to form Sequence")}
    var matrixColumn = matrix[0].length
    var matrixRow = matrix.length
    var outputRow = []
    for(let i = 0; i < matrix.length; i++){
        outputRow = outputRow.concat(matrix[i])
    }
    if(outputRow.length !== matrixRow * matrixColumn){return console.log('Matrix is not a Matrix')}
    return {
        content: outputRow,
        row: matrixRow,
        column: matrixColumn
    }
}

function toMatrix(sequence, row, column){
    if(!sequence){return console.log("No Sequence to form Matrix")}
    if(!row | !column){return console.log("No row or column provided to form Matrix")}
    if(sequence.length !== row*column){return console.log("Invalid Sequence to form Matrix")}
    var outputMatrix = []
    for(let i = 0; i < row; i++){
        outputMatrix[i] = sequence.slice(i*column, i*column+column)
    }
    return outputMatrix
}

function textToIndex(text){
    if(!text){return console.log("No Test provided to convert to Index")}
    for(let i = 0; i < text.length; i++){
        text[i] = index.indexOf(text[i])
    }
    return text
}

function textToSequence(text){
    if(text.length % key.length !== 0){return console.log('Text length is wrong')}
    var textsequence = text.split("")
    var row = key.length
    var column = text.length / key.length
    return {
        content: textsequence,
        row: row,
        column: column
    }
}

function sequenceToText(text){
    text = text.join('')
    return text
}

function matrixFlipper(matrix){
    if(!matrix){return console.log('No Matrix to flip')}
    var outputMatrix = []
    for(let i = 0; i < matrix[0].length; i++){
        var output = []
        output.push(matrix[0][i])
        outputMatrix.push(output)
    }
    for(let i = 1; i < matrix.length; i++){
        var linear = matrix[i]
        for(let i = 0; i < linear.length; i++){
            outputMatrix[i].push(linear[i])
        }
    }
    return outputMatrix
}

function matrix2Multiplier(matrix1, matrix2){
    if(!matrix1 | !matrix2){return console.log('No Matrix to multiply')}
    matrix1 = toMatrix(matrix1.content, matrix1.row, matrix1.column)
    matrix2 = toMatrix(matrix2.content, matrix2.row, matrix2.column)
    var outputMatrix = []
    matrix2 = matrixFlipper(matrix2)
    for(let i = 0; i < matrix1.length; i++){
        var row1 = matrix1[i]
        var outputRow = []
        for(let i = 0; i < matrix2.length; i++){
            var row2 = matrix2[i]
            if(row1.length !== row2.length){return console.log("Matrix length is wrong")}
            var output = 0
            for(let i = 0; i < row1.length; i++){
                output += row1[i]*row2[i]
            }
            outputRow.push(output)
        }
        outputMatrix.push(outputRow)
    }
    return toSequence(outputMatrix)
}

function encodeText(text, key){
    if(!text){return console.log('No Text to encode')}
    if(!key){return console.log('No Key to encode Text')}
    let output = {}
    text = textToSequence(text)
    key = toSequence(key)
    text.content = textToIndex(text.content)
    output.text = toMatrix(text.content, text.row, text.column)
    let encodedMatrix = matrix2Multiplier(key, text)
    output.multipliedMatrix = toMatrix(encodedMatrix.content, encodedMatrix.row, encodedMatrix.column)
    output.modifiedMatrix = []
    for(let i = 0; i < encodedMatrix.content.length; i++){
        encodedMatrix.content[i] = encodedMatrix.content[i] % index.length
        output.modifiedMatrix[i] = encodedMatrix.content[i]
        encodedMatrix.content[i] = index[encodedMatrix.content[i]]
    }
    output.modifiedMatrix = toMatrix(output.modifiedMatrix, encodedMatrix.row, encodedMatrix.column)
    encodedMatrix.content = sequenceToText(encodedMatrix.content)
    output.encodedMatrix = toMatrix(encodedMatrix.content, encodedMatrix.row, encodedMatrix.column)
    return output
}

function decodeText(text, key){
    if(!text){return console.log('No Text to decode')}
    if(!key){return console.log('No Key to decode Text')}
    output = {}
    text = textToSequence(text)
    text.content = textToIndex(text.content)
    output.text = toMatrix(text.content, text.row, text.column)
    key = toSequence(key)
    if(key.row !== 2 | key.column !== 2){return console.log('Matrix of Key is wrong')}
    var determinant = key.content[0]*key.content[3]-key.content[1]*key.content[2]
    var decodeKey = [key.content[3],-key.content[1],-key.content[2],key.content[0]]
    for(let i = 0; i < decodeKey.length; i++){
        decodeKey[i] = 1/determinant*decodeKey[i]
    }
    decodeKey = {
        content: decodeKey,
        row: key.row,
        column: key.column
    }
    output.decodeKey = toMatrix(decodeKey.content, decodeKey.row, decodeKey.column)
    var decodedMatrix = matrix2Multiplier(decodeKey, text)
    output.multipliedMatrix = toMatrix(decodedMatrix.content, decodedMatrix.row, decodedMatrix.column)
    output.modifiedMatrix = []
    for(let i = 0; i < decodedMatrix.content.length; i++){
        if(decodedMatrix.content[i] >= 0){
            decodedMatrix.content[i] = decodedMatrix.content[i] % index.length
        } else {
            decodedMatrix.content[i] = index.length - Math.abs(decodedMatrix.content[i]) % index.length
            if(decodedMatrix.content[i] === index.length){decodedMatrix.content[i] = 0}
        }
        output.modifiedMatrix[i] = decodedMatrix.content[i]
        decodedMatrix.content[i] = index[decodedMatrix.content[i]]
    }
    output.modifiedMatrix = toMatrix(output.modifiedMatrix, decodedMatrix.row, decodedMatrix.column)
    decodedMatrix.content = sequenceToText(decodedMatrix.content)
    output.decodedMatrix = toMatrix(decodedMatrix.content, decodedMatrix.row, decodedMatrix.column)
    return output
}

console.log(encodeText('MATRICES',key))
console.log(decodeText('AENJGKQS',key))

