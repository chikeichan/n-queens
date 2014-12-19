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
    if(i<x){
      newBoard[i] = board[i];
    } else {
      newBoard[i] = board[i].slice();
    }
    //newBoard[i] = board[i].slice();
  }

  var n = newBoard.length;
  for(var i = 0; i<n; i++){
    if(x+i<n && y+i<n) newBoard[x+i][y+i]--;
    //if(x-i>=0 && y-i>=0) newBoard[x-i][y-i]--;
    //if(x-i>=0 && y+i<n) newBoard[x-i][y+i]--;
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

nqueen.solve = function(n,z){
  var start = new Date().getTime();
  if(n===0) return [undefined];

  var outcome = 0;
  //create board n-size
  var board = this._createBoard(n);

  //function
  var _next = function(board,queens,force){
    //Uncomment line below to get just one result
    //if(outcome.length>0){return};
    var length = n;
    if(force !== undefined){
      length = 1;
    }
    for (var q=0; q<length; q++){
      //if(the cell is 0)
      var i = q;
      if(force !== undefined){
        i=force;
      }
      if(board[queens][i]===0){
        //insert queen
        var newBoard = nqueen._quickinsert(board,queens,i);
        var newQ = queens + 1;
        if(newQ === n){
          // outcome.push(newBoard);
          outcome++;

        } else {
          _next(newBoard,newQ);
        }
      }
      if(i===n-1 && !newQ){
        return;
      }
    }
  }

  //for(var z=0;z<1;z++){
    _next(board,0,z);
  //}

  //_next(board,0);
  var end = new Date().getTime();
  console.log(''+n+' Queens: '+outcome.length+' in '+(end-start)+'ms');
  return outcome;
}


fastsolve = function(n,z){
  var start = new Date().getTime();
  var sol = [];

  var solve = function(board){
    //var board = board.slice();
    var nx = board.length;
    //console.log(board);
    if(board.length === n){
      sol.push(board);
      return;
    }
    for (var i = 0; i<n; i++){
      var legal = true;
      for (var j=0; j<board.length; j++){
        var ox = j;
        var oy = board[j];
        var slope = Math.abs((nx-ox)/(i-oy));
        //console.log(nx,ox,i,oy,slope);
        if(i===oy || slope === 1){
          legal = false;
          break;
        }
      }
      if(legal){
        board.push(i);
        solve(board)
        board.pop();
      }
    }
  }
  if(z!==undefined){
    solve([z])
  } else {
    solve([])
  }
  var end = new Date().getTime();
  console.log(end-start+'ms');
  return sol;
}
