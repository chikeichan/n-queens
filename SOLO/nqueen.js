var nqueen = {};


nqueen._createBoard = function(n){
  var board = []
  for(var i = 0; i<n; i++){
    var row = [];
    for(var j = 0; j<n; j++){
      row.push(0);
    }
    board.push(row);
  }
  return board;
}
nqueen._quickinsert = function(board,x,y){
  var newBoard = [];
  for(var i = 0; i<board.length; i++){
    if(i<y){newBoard[i] = board[i]}
    else {newBoard[i] = board[i].slice();}
  }

  var n = newBoard.length;
  for(var i = 0; i<n; i++){
    if(x+i<n && y+i<n) newBoard[x+i][y+i]--;
    if(x-i>=0 && y-i>=0) newBoard[x-i][y-i]--;
    if(x-i>=0 && y+i<n) newBoard[x-i][y+i]--;
    if(x+i<n && y-i>=0) newBoard[x+i][y-i]--;
    if(x+i<n) newBoard[x+i][y]--;
    if(y+i<n) newBoard[x][y+i]--;
    if(x-i>=0) newBoard[x-i][y]--;
    if(y-i>=0) newBoard[x][y-i]--;
  }
  newBoard[x][y] = 1;
  return newBoard;
}


// //Old Insert function
// nqueen._insert = function(board,x,y){
//   var newBoard  = this._clone(board);
//   for(var i = 0; i<newBoard.length; i++){
//     for(var j = 0; j<newBoard.length; j++){
//       var slope = Math.abs((x-i)/(y-j));
//       if(x===i || y===j || slope === 1){
//         newBoard[i][j]--;
//       }
//     }
//   }
//   newBoard[x][y] = 1;
//   return newBoard;
// }

nqueen.solve = function(n){
  if(n===0) return [undefined];

  var outcome = [];
  //create board n-size
  var board = this._createBoard(n);

  //function
  var _next = function(board,queens){
    //Uncomment line below to get just one result
    //if(outcome.length>0){return};
    for (var i=0; i<n; i++){
      //if(the cell is 0)
      if(board[queens][i]===0){
        //insert queen
        var newBoard = nqueen._quickinsert(board,queens,i);
        var newQ = queens + 1;
        if(newQ === n){
          outcome.push(newBoard);
        } else {
          _next(newBoard,newQ);
        }
      }
      if(i===n-1 && !newQ){
        return;
      }
    }
  }
  _next(board,0);
  return outcome;
}