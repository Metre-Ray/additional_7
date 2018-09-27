module.exports = function solveSudoku(matrix) {

  let matrix2 = [...matrix];                          //copy of sudoku matrix
  let previous_attempts = [];                         //array of arrays of numbers which we have already tried to put into cells
  let empty_cells = get_empty_cells(matrix2);         //array with coordinates [i,j] of empty cells
  let index = 0;                                      //number of current empty cell
  let coordinates = empty_cells[index];               //coordinates of current empty cell
  let number_of_empty_cells = empty_cells.length;     //number of empty cells

  if (coordinates.length === 0) return matrix2;     //TODO
  for (let i = 0; i < number_of_empty_cells; i++) {
    previous_attempts.push([]);
  }

  while (index < number_of_empty_cells) {   //while we won't fill all empty cells correctly

    for (let i = 1; i < 10; i++) {          //try to put number i into empty cell

      if (previous_attempts[index].indexOf(i) === -1) {   //if number i haven't been tried yet
        matrix2[coordinates[0]][coordinates[1]] = i;
        previous_attempts[index].push(i);
        if (check_correctness(matrix2, coordinates[0], coordinates[1])) {
          break;
        }
      }

      if (i === 9) {           //return to previous empty cells on the next iteration and unchange the current cell
        matrix2[coordinates[0]][coordinates[1]] = 0;
        previous_attempts[index] = [];
        index -= 2;
      }
    }

    index += 1;
    coordinates = empty_cells[index];
  }

  return matrix2;
}


function check_correctness(matrix, x, y) {
  let row = matrix[x],
      temp_array = [];
  for (let i = 0; i < row.length; i++) {        //check row
    if (row[i] !== 0 && temp_array.indexOf(row[i]) !== -1) {
      return false;
    }
    temp_array.push(row[i]);
  }
  temp_array = [];
  for (let i = 0; i < matrix.length; i++) {      //check column
    if (matrix[i][y] !== 0 && temp_array.indexOf(matrix[i][y]) !== -1) {
      return false
    }
    temp_array.push(matrix[i][y]);
  }
  temp_array = [];
  for (let i = (x - x % 3); i < (x - x % 3) + 3; i++) {    //check box
    for (let j = (y - y % 3); j < (y - y % 3) + 3; j++) {
      if (matrix[i][j] !== 0 && temp_array.indexOf(matrix[i][j]) !== -1) {
        return false
      }
      temp_array.push(matrix[i][j]);
    }
  }
  return true;
}


function get_empty_cells(matrix) {
  let empty_cells = [];
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        empty_cells.push([i, j]);
      }
    }
  }
  return empty_cells;
}
