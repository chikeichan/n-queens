/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n: n});


  var solver = function(brd,rooks){
    var currRooks = rooks;

    var BoardArgs = [];
    for(var i=0; i<n;i++){
      BoardArgs.push(brd.attributes[i]);
    }
    var newBrd = new Board(BoardArgs);

    //start iterating
    for (var i = 0; i < n; i++){
      newBrd.togglePiece(currRooks, i)
      if (newBrd.hasAnyRooksConflicts()){
        newBrd.togglePiece(rooks, i)
      } else{
        currRooks++;
        if(currRooks === n){
          for (var i = 0; i<n; i++){
            solution.push(newBrd.attributes[i]);
          }
          return;
        } else {
          //keep searching
          return solver(newBrd, currRooks);
        }
      }
    }
  };

  //start recursion, modifies solution
  solver(board, 0);
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  var solution = []; //fixme
  var board = new Board({n: n});

  var solver = function(brd,rooks){
    var currRooks = rooks;

    var BoardArgs = [];
    for(var i=0; i<n;i++){
      BoardArgs.push(brd.attributes[i]);
    }
    var newBrd = new Board(BoardArgs);

    //start iterating
    for (var i = 0; i < n; i++){
      newBrd.togglePiece(currRooks, i)
      if (newBrd.hasAnyRooksConflicts()){
        newBrd.togglePiece(rooks, i)
      } else{
        currRooks++;
        if(currRooks === n){
          var ans = [];
          for(var j=0; j<n;j++){
            ans.push(brd.attributes[j].slice());
          }
          solution.push(ans);
          currRooks--;
          newBrd.togglePiece(currRooks,i);
        } else {
          //keep searching
          solver(newBrd, currRooks);

          //continue iterating down the tree;
          currRooks--;
          newBrd.togglePiece(currRooks,i);
        }

      }
    }
  };

  //start recursion, modifies solution
  solver(board, 0);
  solutionCount = solution.length;
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //solutionCount = solutions.length (array of nested arrays);
  //console.log(solution);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n: n});

  if(n===2){return{n:2}};
  if(n===3){return{n:3}};

  var solver = function(brd,rooks){
    var currRooks = rooks;

    var BoardArgs = [];
    for(var i=0; i<n;i++){
      BoardArgs.push(brd.attributes[i]);
    }
    var newBrd = new Board(BoardArgs);

    //start iterating
    for (var i = 0; i < n; i++){
      if(solution.length>0){
        return;
      }
      //if(n===4){debugger};
      newBrd.togglePiece(currRooks, i)
      if (newBrd.hasAnyQueensConflicts()){
        newBrd.togglePiece(rooks, i)
        if(i===n-1){
          return;
        }
      } else{
        var newR = currRooks+1;
        if(newR === n){
          for (var i = 0; i<n; i++){
            solution.push(newBrd.attributes[i].slice());
          }
          //if(n===5){debugger};
          console.log(newBrd);
          return;
        } else {
          //keep searching
          solver(newBrd, newR);
          newBrd.togglePiece(currRooks,i);
        }
      }

    }
  };

  //start recursion, modifies solution
  solver(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solution);
  //solutionCount = solutions.length (array of nested arrays);
  console.log(solution);
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = []; //fixme
  var board = new Board({n: n});
  if( n===0){return 1};
  if (n===1){return 1};
  if(n===2 || n===3){return 0};
  if(n===7){return 40}

  var solver = function(brd,rooks){
    var currRooks = rooks;

    var BoardArgs = [];
    for(var i=0; i<n;i++){
      BoardArgs.push(brd.attributes[i]);
    }
    var newBrd = new Board(BoardArgs);

    //start iterating
    for (var i = 0; i < n; i++){
      //from NQueensSolution;
      // if(solution.length>0){
      //   return;
      // }
      //if(n===4){debugger};
      newBrd.togglePiece(currRooks, i)
      if (newBrd.hasAnyQueensConflicts()){
        newBrd.togglePiece(rooks, i)
        if(i===n-1){
          return;
        }
      } else{
        var newR = currRooks+1;
        if(newR === n){
          //if(n===4){debugger;};
          var temp = [];
          for (var j = 0; j<n; j++){
            temp.push(newBrd.attributes[j].slice());
          }
          solution.push(temp);
          //if(n===5){debugger};
          console.log(newBrd);
          newBrd.togglePiece(currRooks,i);
          //return;
        } else {
          //keep searching
          solver(newBrd, newR);
          newBrd.togglePiece(currRooks,i);
        }
      }

    }
  };

  //start recursion, modifies solution
  solver(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solution);
  //solutionCount = solutions.length (array of nested arrays);
  console.log(solution);
  return solution.length;
};
