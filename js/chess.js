function Chess(config) {
    var parent = this;
    this.kingClass = 'king';
    this.selected = null;
    this.color = "white";
    this.player = "white";
    this.sign = 1;
    this.step = 1;
    this.flip = false;
    this.areaArr = null;
    this.queen = null;
    this.board = null;
    this.allowWRCastling = true;
    this.allowBRCastling = true;
    this.allowWLCastling = true;
    this.allowBLCastling = true;
    this.wpawn = $("<div></div>").attr('class', 'figure white pawn');
    this.bpawn = $("<div></div>").attr('class', 'figure black pawn');
    this.wrook = $("<div></div>").attr('class', 'figure white rook');
    this.brook = $("<div></div>").attr('class', 'figure black rook');
    this.wknight = $("<div></div>").attr('class', 'figure white knight');
    this.bknight = $("<div></div>").attr('class', 'figure black knight');
    this.wbishop = $("<div></div>").attr('class', 'figure white bishop');
    this.bbishop = $("<div></div>").attr('class', 'figure black bishop');
    this.wking = $("<div></div>").attr('class', 'figure white king');
    this.bking = $("<div></div>").attr('class', 'figure black king');
    this.wqueen = $("<div></div>").attr('class', 'figure white queen');
    this.bqueen = $("<div></div>").attr('class', 'figure black queen');
    this.allow = $("<div></div>").attr('class', 'allow');

    this.wpawnArea = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"];
    this.bpawnArea = ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"];
    this.characters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    this.lastMove = {
        from: null,
        to: null,
        figure: null
    };

    this.constructor = function() {
        this.renderBoard();
        this.startPosition();
        this.buttonFunctions();
    };

    this.isAttacked = function(field, color) {
        var num = Number(field.slice(-1)),
            character = field.substring(0, 1),
            charIndex = parent.characters.indexOf(character),
            sign = -1,
            i = 0,
            fig = null;
        if (color === "white") {
            sign = 1;
        } 
        /* Check for rook, bishop and queen */
        for (i = num + 1; i <= 8; i++) {
            fig = $('#' + character + i).find('.figure');
            if (fig.length && (!$('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("rook") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = num - 1; i >= 0; i--) {
            fig = $('#' + character + i).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("rook") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = charIndex + 1; i <= 7; i++) {
            fig = $('#' + parent.characters[i] + num).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("rook") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = charIndex - 1; i >= 0; i--) {
            fig = $('#' + parent.characters[i] + num).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("rook") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = num + 1, j = charIndex + 1; i <= 8 && j <= 7; i++, j++) {
            fig = $('#' + parent.characters[j] + i).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("bishop") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = num + 1, j = charIndex - 1; i <= 8 && j >= 0; i++, j--) {
            fig = $('#' + parent.characters[j] + i).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("bishop") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = num - 1, j = charIndex + 1; i >= 0 && j <= 7; i--, j++) {
            fig = $('#' + parent.characters[j] + i).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("bishop") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        for (i = num - 1, j = charIndex - 1; i >= 0 && j >= 0; i--, j--) {
            fig = $('#' + parent.characters[j] + i).find('.figure');
            if (fig.length && ($('#' + field).find('.figure').hasClass('king') || fig[0] !== parent.selected[0])) {
                if (!fig.hasClass(color) && (fig.hasClass("bishop") || fig.hasClass("queen"))) {
                    return true;
                }
                break;
            }
        }
        /* Check for knight */
        function checkKnight(pos) {
            var fig = $(pos).find('.figure');
            if (fig.length && fig.hasClass("knight") && !fig.hasClass(color)) {
                return true;
            }
            return false;
        }
        if (checkKnight('#' + parent.characters[charIndex + 2] + (num + 1))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex + 2] + (num - 1))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex - 2] + (num + 1))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex - 2] + (num - 1))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex + 1] + (num + 2))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex + 1] + (num - 2))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex - 1] + (num + 2))) {
            return true;
        }
        if (checkKnight('#' + parent.characters[charIndex - 1] + (num - 2))) {
            return true;
        }
        /* Check for King */
        function checkKing(pos) {
            var fig = $(pos).find('.figure');
            if (fig.length && fig.hasClass("king") && !fig.hasClass(color)) {
                return true;
            }
            return false;
        }
        if (checkKing('#' + parent.characters[charIndex + 1] + (num + 1))) {
            return true;
        }
        if (checkKing('#' + parent.characters[charIndex + 1] + (num))) {
            return true;
        }
        if (checkKing('#' + parent.characters[charIndex + 1] + (num - 1))) {
            return true;
        }
        if (checkKing('#' + character + (num + 1))) {
            return true;
        }
        if (checkKing('#' + character + (num - 1))) {
            return true;
        }
        if (checkKing('#' + parent.characters[charIndex - 1] + (num + 1))) {
            return true;
        }
        if (checkKing('#' + parent.characters[charIndex - 1] + (num))) {
            return true;
        }
        if (checkKing('#' + parent.characters[charIndex - 1] + (num - 1))) {
            return true;
        }
        /* Check for pawns */
        if (($('#' + parent.characters[charIndex + 1] + (num + sign)).find('.figure').hasClass('pawn') && !$('#' + parent.characters[charIndex + 1] + (num + sign)).find('.figure').hasClass(color)) || ($('#' + parent.characters[charIndex - 1] + (num + sign)).find('.figure').hasClass('pawn') && !$('#' + parent.characters[charIndex - 1] + (num + sign)).find('.figure').hasClass(color))) {
            return true;
        }
        return false;
    };

    this.renderBoard = function() {
        $('body').append('<div id="board"></div>');
        for (var i = 8; i >= 1; i--) { // i - tiv, j - tar
            for (var j = 0; j < 8; j++) {
                var startColor = -1; // black
                this.color = 'black';
                if (i % 2 === 0) {
                    startColor = 1; // white
                }
                var currentColor = -startColor;
                if (j % 2 === 0) {
                    currentColor = startColor;
                }
                if (currentColor === 1) {
                    this.color = 'white';
                }
                $('#board').append('<div class="' + this.color + '" id="' + this.characters[j] + i + '"><span>' + this.characters[j] + i + '</span></div>');
            }
        }
        $('body').append('<button id="importChessPos"><span>Import position</span></button><button id="exportChessPos"><span>Export position</span></button><button id="startPos"><span>Start position</span></button><input type="checkbox" id="doflip"><label for="doflip">Flip the board?</label><div class="steps"><table border="1"></table></div>');
        this.board = $("#board");
    };

    this.startPosition = function() {
        var i = 0;
        $('.figure').remove();
        $('.steps table').empty().append('<tr class="heading"><td>No.</td><td>White</td><td>Black</td></tr>');
        parent.player = "white";
        for (i = 0; i < parent.wpawnArea.length; i++) {
            parent.wpawn.clone().appendTo($('#' + parent.wpawnArea[i]));
        }
        for (i = 0; i < parent.bpawnArea.length; i++) {
            parent.bpawn.clone().appendTo($('#' + parent.bpawnArea[i]));
        }
        parent.brook.clone().appendTo($('#a8, #h8'));
        parent.bknight.clone().appendTo($('#b8, #g8'));
        parent.bbishop.clone().appendTo($('#c8, #f8'));
        parent.bqueen.clone().appendTo($('#d8'));
        parent.bking.clone().appendTo($('#e8'));
        parent.wrook.clone().appendTo($('#a1, #h1'));
        parent.wknight.clone().appendTo($('#b1, #g1'));
        parent.wbishop.clone().appendTo($('#c1, #f1'));
        parent.wqueen.clone().appendTo($('#d1'));
        parent.wking.clone().appendTo($('#e1'));
        parent.bindEvents();
    };

    this.buttonFunctions = function() {
        $('#startPos').click(this.startPosition);
        $('#importChessPos').click(this.jsonPosition);
        $('#exportChessPos').click(this.exportPosition);
        $('#doflip').on('change', this.flipBoolean);
    };

    this.flipBoolean = function() {
        parent.flip = false;
        if ($(this).is(':checked')) {
            parent.flip = true;
        }
    };

    this.bindEvents = function() {
        $('.figure').unbind('click').bind('click', this.figureClick);
        $('.pawn').bind('click', this.pawnMoves);
        $('.rook').bind('click', this.rookMoves);
        $('.knight').bind('click', this.knightMoves);
        $('.bishop').bind('click', this.bishopMoves);
        $('.king').bind('click', this.kingMoves);
        $('.queen').bind('click', this.queenMoves);
    };

    this.jsonPosition = function() {
        var data = prompt('Insert JSON here'),
            i = 0;
        if (data) {
            $('.figure').remove();
            $('.steps table').empty().append('<tr class="heading"><td>No.</td><td>White</td><td>Black</td></tr>');
            data = JSON.parse(data);
            parent.color = data.player;
            parent.allowWRCastling = data.WRCastling;
            parent.allowBRCastling = data.BRCastling;
            parent.allowWLCastling = data.WLCastling;
            parent.allowBLCastling = data.BLCastling;
            parent.player = "black";
            parent.sign = -1;
            if (parent.color === "white") {
                parent.player = "white";
                parent.sign = 1;
            }
            for (i = 0; i < data.white.pawn.length; i++) {
                parent.wpawn.clone().appendTo($('#' + data.white.pawn[i]));
            }
            for (i = 0; i < data.white.rook.length; i++) {
                parent.wrook.clone().appendTo($('#' + data.white.rook[i]));
            }
            for (i = 0; i < data.white.bishop.length; i++) {
                parent.wbishop.clone().appendTo($('#' + data.white.bishop[i]));
            }
            for (i = 0; i < data.white.knight.length; i++) {
                parent.wknight.clone().appendTo($('#' + data.white.knight[i]));
            }
            for (i = 0; i < data.white.queen.length; i++) {
                parent.wqueen.clone().appendTo($('#' + data.white.queen[i]));
            }
            parent.wking.clone().appendTo($('#' + data.white.king));

            for (i = 0; i < data.black.pawn.length; i++) {
                parent.bpawn.clone().appendTo($('#' + data.black.pawn[i]));
            }
            for (i = 0; i < data.black.rook.length; i++) {
                parent.brook.clone().appendTo($('#' + data.black.rook[i]));
            }
            for (i = 0; i < data.black.bishop.length; i++) {
                parent.bbishop.clone().appendTo($('#' + data.black.bishop[i]));
            }
            for (i = 0; i < data.black.knight.length; i++) {
                parent.bknight.clone().appendTo($('#' + data.black.knight[i]));
            }
            for (i = 0; i < data.black.queen.length; i++) {
                parent.bqueen.clone().appendTo($('#' + data.black.queen[i]));
            }
            parent.bking.clone().appendTo($('#' + data.black.king));

            parent.bindEvents();
        }
    };

    this.exportPosition = function() {
        parent.obj = {
            'white': {
                'pawn': [],
                'rook': [],
                'bishop': [],
                'knight': [],
                'queen': [],
                'king': $('.white.king').parent().attr('id')
            },
            'black': {
                'pawn': [],
                'rook': [],
                'bishop': [],
                'knight': [],
                'queen': [],
                'king': $('.black.king').parent().attr('id')
            },
            'player': parent.player,
            'WRCastling': parent.allowWRCastling,
            'BRCastling': parent.allowBRCastling,
            'WLCastling': parent.allowWLCastling,
            'BLCastling': parent.allowBLCastling
        };
        
        $.each(["pawn", "rook", "bishop", "knight", "queen"], function(index, value) {
            $('.white.' + value + '').each(function(index) {
                parent.obj['white'][value].push($(this).parent().attr('id'));
            });
            $('.black.' + value + '').each(function(index) {
                parent.obj['black'][value].push($(this).parent().attr('id'));
            });
        });
        $('.steps').before('<input type="text" id="jsonExport" value="">');
        $('#jsonExport').val(JSON.stringify(parent.obj)).select();
    };

    this.figureClick = function() {
        parent.sign = -1;
        parent.areaArr = parent.bpawnArea;
        parent.color = 'black';
        if ($(this).hasClass('white')) {
            parent.sign = 1;
            parent.areaArr = parent.wpawnArea;
            parent.color = 'white';
        }
    };

    this.pawnMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            var num = parseInt($(this).parent().attr('id').slice(-1)) + parent.sign * 1,
                num2 = parseInt($(this).parent().attr('id').slice(-1)) + parent.sign * 2,
                character = $(this).parent().attr('id').charAt(0),
                charIndex = parent.characters.indexOf(character);
            parent.selected = $(this);
            if (!$('#' + character + num).children(".figure").length) {
                parent.allow.clone().appendTo($('#' + character + num));
                if (parent.areaArr.indexOf($(this).parent().attr('id')) > -1 && !$('#' + character + num2).children(".figure").length) {
                    parent.allow.clone().appendTo($('#' + character + num2));
                }
                parent.move();
            }
            if ($('#' + parent.characters[charIndex - 1] + (num)).children(".figure").length && !$('#' + parent.characters[charIndex - 1] + (num)).children(".figure").hasClass(parent.color)) {
                parent.allow.clone().appendTo($('#' + parent.characters[charIndex - 1] + (num)));
                parent.move();
            }
            if ($('#' + parent.characters[charIndex + 1] + (num)).children(".figure").length && !$('#' + parent.characters[charIndex + 1] + (num)).children(".figure").hasClass(parent.color)) {
                parent.allow.clone().appendTo($('#' + parent.characters[charIndex + 1] + (num)));
                parent.move();
            }
            if ($(this).hasClass('white') && num === 6) {
                if (parent.lastMove['figure'] === "pawn" && (parent.lastMove['from'].substring(0, 1) === parent.characters[charIndex + 1] || parent.lastMove['from'].substring(0, 1) === parent.characters[charIndex - 1]) && parent.lastMove['from'].slice(-1) === "7" && parent.lastMove['to'].slice(-1) === "5") {
                    parent.allow.clone().appendTo($('#' + parent.lastMove['from'].substring(0, 1) + 6));
                    parent.move('pawnCapture');
                }
            }
            if ($(this).hasClass('black') && num === 3) {
                if (parent.lastMove['figure'] === "pawn" && (parent.lastMove['from'].substring(0, 1) === parent.characters[charIndex + 1] || parent.lastMove['from'].substring(0, 1) === parent.characters[charIndex - 1]) && parent.lastMove['from'].slice(-1) === "2" && parent.lastMove['to'].slice(-1) === "4") {
                    parent.allow.clone().appendTo($('#' + parent.lastMove['from'].substring(0, 1) + 3));
                    parent.move('pawnCapture');
                }
            }
        }
    };

    this.rookMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            parent.selected = $(this);
            var place = $(this).parent().attr('id'),
                num = Number(place.slice(-1)),
                character = place.substring(0, 1),
                charIndex = parent.characters.indexOf(character),
                i = 0,
                loopVer = function() {
                    var tpos = $('#' + character + i),
                        fig = tpos.find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                },
                loopHor = function() {
                    var fig = $('#' + parent.characters[i] + num).find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo($('#' + parent.characters[i] + num));
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo($('#' + parent.characters[i] + num));
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                };
            for (i = num + 1; i <= 8; i++) {
                if (loopVer()) {
                    break;
                }
            }
            for (i = num - 1; i >= 1; i--) {
                if (loopVer()) {
                    break;
                }
            }
            for (i = charIndex + 1; i <= 7; i++) {
                if (loopHor()) {
                    break;
                }
            }
            for (i = charIndex - 1; i >= 0; i--) {
                if (loopHor()) {
                    break;
                }
            }
        }
    };

    this.knightMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            var place = $(this).parent().attr('id'),
                num = Number(place.slice(-1)),
                character = place.substring(0, 1),
                charIndex = parent.characters.indexOf(character);
            parent.selected = $(this);

            function check(pos) {
                var fig = $(pos).find('.figure');
                if (!fig.length || !fig.hasClass(parent.color)) {
                    parent.allow.clone().appendTo($(pos));
                    parent.move();
                }
            }
            check('#' + parent.characters[charIndex + 2] + (num + 1));
            check('#' + parent.characters[charIndex + 2] + (num - 1));
            check('#' + parent.characters[charIndex - 2] + (num + 1));
            check('#' + parent.characters[charIndex - 2] + (num - 1));
            check('#' + parent.characters[charIndex + 1] + (num + 2));
            check('#' + parent.characters[charIndex + 1] + (num - 2));
            check('#' + parent.characters[charIndex - 1] + (num + 2));
            check('#' + parent.characters[charIndex - 1] + (num - 2));
        }
    };

    this.bishopMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            parent.selected = $(this);
            var place = $(this).parent().attr('id'),
                num = Number(place.slice(-1)),
                character = place.substring(0, 1),
                charIndex = parent.characters.indexOf(character),
                count = 0,
                i = 0;
                loops = function() {
                    var tpos = $('#' + parent.characters[j] + i),
                        fig = tpos.find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                };
            for (i = num + 1, j = charIndex + 1; i <= 8 && j <= 7; i++, j++) {
                if (loops()) {
                    break;
                }
            }
            for (i = num + 1, j = charIndex - 1; i <= 8 && j >= 0; i++, j--) {
                if (loops()) {
                    break;
                }
            }
            for (i = num - 1, j = charIndex + 1; i >= 0 && j <= 7; i--, j++) {
                if (loops()) {
                    break;
                }
            }
            for (i = num - 1, j = charIndex - 1; i >= 0 && j >= 0; i--, j--) {
                if (loops()) {
                    break;
                }
            }
        }
    };

    this.kingMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            var place = $(this).parent().attr('id'),
                num = Number(place.slice(-1)),
                character = place.substring(0, 1),
                charIndex = parent.characters.indexOf(character);
            parent.selected = $(this);

            function check(pos) {
                var fig = $('#' + pos).find('.figure');
                if ((!fig.length || !fig.hasClass(parent.color)) && !parent.isAttacked(pos, parent.color)) {
                    parent.allow.clone().appendTo($('#' + pos));
                    parent.move();
                }
            }
            if (num + 1 <= 8) {
                check(character + (num + 1));
            }
            if (num - 1 >= 1) {
                check(character + (num - 1));
            }
            if (charIndex + 1 <= 7) {
                check(parent.characters[charIndex + 1] + num);
            }
            if (charIndex - 1 >= 0) {
                check(parent.characters[charIndex - 1] + num);
            }
            if (num + 1 <= 8 && charIndex + 1 <= 7) {
                check(parent.characters[charIndex + 1] + (num + 1));
            }
            if (num + 1 <= 8 && charIndex - 1 >= 0) {
                check(parent.characters[charIndex - 1] + (num + 1));
            }
            if (num - 1 >= 1 && charIndex + 1 <= 7) {
                check(parent.characters[charIndex + 1] + (num - 1));
            }
            if (num - 1 >= 1 && charIndex - 1 >= 0) {
                check(parent.characters[charIndex - 1] + (num - 1));
            }
            if (parent.allowWLCastling && parent.color === 'white') {
                if (!$('#b1').find('.figure').length && !$('#c1').find('.figure').length && !$('#d1').find('.figure').length && !parent.isAttacked("b1", parent.color) && !parent.isAttacked("c1", parent.color) && !parent.isAttacked("d1", parent.color)) {
                    check(parent.characters[charIndex - 2] + num);
                }
            }
            if (parent.allowWRCastling && parent.color === 'white') {
                if (!$('#f1').find('.figure').length && !$('#g1').find('.figure').length && !parent.isAttacked("f1", parent.color) && !parent.isAttacked("g1", parent.color)) {
                    check(parent.characters[charIndex + 2] + num);
                }
            }
            if (parent.allowBLCastling && parent.color === 'black') {
                if (!$('#b8').find('.figure').length && !$('#c8').find('.figure').length && !$('#d8').find('.figure').length && !parent.isAttacked("b8", parent.color) && !parent.isAttacked("c8", parent.color) && !parent.isAttacked("d8", parent.color)) {
                    check(parent.characters[charIndex - 2] + num);
                }
            }
            if (parent.allowBRCastling && parent.color === 'black') {
                if (!$('#f8').find('.figure').length && !$('#g8').find('.figure').length && !parent.isAttacked("f8", parent.color) && !parent.isAttacked("g8", parent.color)) {
                    check(parent.characters[charIndex + 2] + num);
                }
            }
        }
    };

    this.queenMoves = function() {
        if (!parent.board.find(".allow").length && $(this).hasClass(parent.player)) {
            parent.selected = $(this);
                place = $(this).parent().attr('id'),
                num = Number(place.slice(-1)),
                character = place.substring(0, 1),
                charIndex = parent.characters.indexOf(character),
                i = 0;
                loopVer = function() {
                    var tpos = $('#' + character + i),
                        fig = tpos.find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                },
                loopHor = function() {
                    var tpos = $('#' + parent.characters[i] + num),
                        fig = tpos.find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                },
                loopDiag = function() {
                    var tpos = $('#' + parent.characters[j] + i),
                        fig = tpos.find('.figure');
                    if (!fig.length) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                    } else if (!fig.hasClass(parent.color)) {
                        parent.allow.clone().appendTo(tpos);
                        parent.move();
                        return true;
                    } else {
                        return true;
                    }
                    return false;
                };
            for (i = num + 1; i <= 8; i++) {
                if (loopVer()) {
                    break;
                }
            }
            for (i = num - 1; i >= 1; i--) {
                if (loopVer()) {
                    break;
                }
            }
            for (i = charIndex + 1; i <= 7; i++) {
                if (loopHor()) {
                    break;
                }
            }
            for (i = charIndex - 1; i >= 0; i--) {
                if (loopHor()) {
                    break;
                }
            }
            for (i = num + 1, j = charIndex + 1; i <= 8 && j <= 7; i++, j++) {
                if (loopDiag()) {
                    break;
                }
            }
            for (i = num + 1, j = charIndex - 1; i <= 8 && j >= 0; i++, j--) {
                if (loopDiag()) {
                    break;
                }
            }
            for (i = num - 1, j = charIndex + 1; i >= 0 && j <= 7; i--, j++) {
                if (loopDiag()) {
                    break;
                }
            }
            for (i = num - 1, j = charIndex - 1; i >= 0 && j >= 0; i--, j--) {
                if (loopDiag()) {
                    break;
                }
            }
        }
    };

    this.move = function(argument) {
        $('.allow').unbind('click').bind('click', function(e) {
            var oldpos = parent.selected.parent();
            if (!parent.selected.hasClass('king') && parent.isAttacked($('.' + parent.color + '.king').parent().attr('id'), parent.color)) {
                parent.selected.appendTo($(this).parent());
                if (parent.isAttacked($('.' + parent.color + '.king').parent().attr('id'), parent.color)) {
                    alert('Check!');
                    parent.selected.appendTo(oldpos);
                    $('.allow').remove();
                    return false;
                }
            }
            //selected.appendTo($(this).parent());
            parent.selected.appendTo($(this).parent(), 1000);
            if (parent.isAttacked($('.' + parent.selected.attr('class').split(" ")[1] + '.king').parent().attr('id'), parent.selected.attr('class').split(" ")[1])) {
                alert('Check!');
                parent.selected.appendTo(oldpos);
                $('.allow').remove();
                return false;
            }
            if (argument === "pawnCapture") {
                $('#' + parent.lastMove["to"]).find('.figure').fadeOut(300, function() {
                    $(this).remove();
                });
            }
            parent.lastMove = {
                from: oldpos.attr('id'),
                to: $(this).parent().attr('id'),
                figure: parent.selected.attr('class').split(/\s+/)[2]
            };
            if (parent.player === "white") {
                parent.player = "black";
                $('table').append('<tr><td class="step">' + parent.step + '</td><td class="whiteMove"></td><td class="blackMove"></td></tr>');
                $('.whiteMove').last().html(parent.lastMove['from'] + '-' + parent.lastMove['to']);
                $('.steps').animate({
                    scrollTop: $('.steps').prop('scrollHeight')
                });
            } else {
                parent.player = "white";
                parent.step++;
                $('.blackMove').last().html(parent.lastMove['from'] + '-' + parent.lastMove['to']);
            }

            if ($(this).parent().find('.figure').length) {
                $(this).parent().find('.figure').remove();
            }
            parent.selected.appendTo($(this).parent(), 1000);
            e.stopPropagation();
            if (parent.selected.hasClass('white king')) {
                parent.allowWLCastling = false;
                parent.allowWRCastling = false;
            }
            if (parent.selected.hasClass('black king')) {
                parent.allowBLCastling = false;
                parent.allowBRCastling = false;
            }
            if (parent.selected.hasClass('white rook') && oldpos.attr('id') === "h1") {
                parent.allowWRCastling = false;
            }
            if (parent.selected.hasClass('white rook') && oldpos.attr('id') === "a1") {
                parent.allowWLCastling = false;
            }
            if (parent.selected.hasClass('black rook') && oldpos.attr('id') === "h8") {
                parent.allowBRCastling = false;
            }
            if (parent.selected.hasClass('black rook') && oldpos.attr('id') === "a8") {
                parent.allowBLCastling = false;
            }
            if (parent.selected.hasClass('king') && $(this).parent().attr('id') === "g1") {
                $('#h1').find('.rook').appendTo('#f1');
            }
            if (parent.selected.hasClass('king') && $(this).parent().attr('id') === "c1") {
                $('#a1').find('.rook').appendTo('#d1');
            }
            if (parent.selected.hasClass('king') && $(this).parent().attr('id') === "g8") {
                $('#h8').find('.rook').appendTo('#f8');
            }
            if (parent.selected.hasClass('king') && $(this).parent().attr('id') === "c8") {
                $('#h8').find('.rook').appendTo('#d8');
            }
            /* Pawn to queen */
            var newPlaceNum = Number($(this).parent().attr('id').slice(-1));
            if ((parent.selected.hasClass('white pawn') && newPlaceNum === 8) || (parent.selected.hasClass('black pawn') && newPlaceNum === 1)) {
                parent.selected.removeClass('pawn').addClass('queen');
            }
            $('.allow').remove();
            if (parent.flip) {
                setTimeout(function() {
                    parent.board.toggleClass('flip');
                }, 500);
            }
            /* Check for check */
            if (parent.isAttacked($('.white.king').parent().attr('id'), 'white') || parent.isAttacked($('.black.king').parent().attr('id'), 'black')) {
                alert('Check!');
            }
            parent.bindEvents();
        });
    };

    this.constructor();
}
