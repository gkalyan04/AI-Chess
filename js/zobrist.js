// initialize table
var zobristTable = new Array();
for (var i=0; i<8; i++){
	zobristTable[i] = new Array();
	for (var j=0; j<8; j++){
		zobristTable[i][j] = new Array();
		for (var k=0; k<12; k++){
			zobristTable[i][j][k] = Math.floor((Math.random() * Number.MAX_SAFE_INTEGER));
		}
	}
}

function indexOf(piece){
	if (piece.color == 'w' && piece.type == 'p'){
		return 0;
	}
	if (piece.color == 'w' && piece.type == 'n'){
		return 1;
	}
	if (piece.color == 'w' && piece.type == 'b'){
		return 2;
	}
	if (piece.color == 'w' && piece.type == 'r'){
		return 3;
	}
	if (piece.color == 'w' && piece.type == 'q'){
		return 4;
	}
	if (piece.color == 'w' && piece.type == 'k'){
		return 5;
	}
	if (piece.color == 'b' && piece.type == 'p'){
		return 6;
	}
	if (piece.color == 'b' && piece.type == 'n'){
		return 7;
	}
	if (piece.color == 'b' && piece.type == 'b'){
		return 8;
	}
	if (piece.color == 'b' && piece.type == 'r'){
		return 9;
	}
	if (piece.color == 'b' && piece.type == 'q'){
		return 10;
	}
	if (piece.color == 'b' && piece.type == 'k'){
		return 11;
	}
}

function computeHash(){
	var hash = 0;
	for (var i=0; i<8; i++){
		for (var j=0; j<8; j++){
			if (game.board()[i][j] != null){
				var piece = indexOf(game.board()[i][j]);
				hash ^= zobristTable[i][j][piece];
			}
		}
	}
	return hash;
}

function updateHash(hash, move){
	from_y = move.from.charCodeAt() - 97;
	from_x = -(parseInt(move.from[1]) - 8);
	to_y = move.to.charCodeAt() - 97;
	to_x = -(parseInt(move.to[1]) - 8);
	var piece = {
		'color': move.color,
		'type': move.piece
	};
	var index = indexOf(piece);
	hash ^= zobristTable[from_x][from_y][index];
	hash ^= zobristTable[to_x][to_y][index];

	return hash;
}