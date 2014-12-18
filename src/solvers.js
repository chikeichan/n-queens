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
      if (n===2){debugger;}
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
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //solutionCount = solutions.length (array of nested arrays);
  console.log(solution);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
