var hashMap = {};
var hash = computeHash();

var minimaxRoot = function(depth, game, isMaximisingPlayer) {
    var newGameMoves = game.ugly_moves();
    var bestHashMove;
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        var move = game.ugly_move(newGameMove);
        var newHash = updateHash(hash, move);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer, newHash);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
            bestHashMove = move;
        }
    }
    hash = updateHash(hash, bestHashMove);
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer, hash) {
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }
    var newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            var move = game.ugly_move(newGameMoves[i]);
            var newHash = updateHash(hash, move);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, newHash));
            hashMap[newHash] = {'bestVal': bestMove, 'alpha': alpha, 'beta': beta, 'depth': depth}; 
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } 
    else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            var move = game.ugly_move(newGameMoves[i]);
            var newHash = updateHash(hash, move);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, newHash));
            hashMap[newHash] = {'bestVal': bestMove, 'alpha': alpha, 'beta': beta, 'depth': depth}; 
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    if (game.game_over()) {
        alert('Game over');
    }
};

var positionCount;
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    positionCount = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());
    var startTime = new Date().getTime();
    var bestMove = minimaxRoot(depth, game, true);
    var moveTime = (new Date().getTime() - startTime);
    var positionsPerS = (positionCount * 1000 / moveTime);
    
    $('#position-count').text(positionCount);
    $('#time').text(moveTime/1000 + 's');
    $('#positions-per-s').text(positionsPerS);
    return bestMove;
};

