window.onload = function() {
    var rams = 0;
    var sheeps = 0;
    var turns = 0;

    var container = document.querySelector('#container');

    var gameTitle = document.createElement('h1');
    var inputNumberTextBox = document.createElement('input');
    var playerNameTextBox = document.createElement('input');
    var playerNameWrapper = document.createElement('div');
    var checkButton = document.createElement('button');
    var saveButton = document.createElement('button');
    var loadScoresButton = document.createElement('button');
    var startNewGameButton = document.createElement('button');
    var highScoresTitle = document.createElement('h2');
    var highScoresList = document.createElement('ol');

    gameTitle.innerHTML = 'Rams and sheeps';

    startNewGameButton.innerHTML = 'New Game';
    startNewGameButton.addEventListener('click', startGame, false);

    inputNumberTextBox.placeholder = 'Guess Number';
    inputNumberTextBox.style.display = 'none';

    checkButton.innerHTML = 'Check';
    checkButton.style.display = 'none';
    checkButton.addEventListener('click', checkNumber, false);

    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', saveScore, false);

    loadScoresButton.innerHTML = 'High Scores';
    loadScoresButton.addEventListener('click', loadScores, false);

    playerNameWrapper.style.display = 'none';
    playerNameWrapper.innerHTML = 'Please enter your name: ';
    playerNameWrapper.appendChild(playerNameTextBox);
    playerNameWrapper.appendChild(saveButton);

    highScoresTitle.innerHTML = 'High Scores';

    container.appendChild(gameTitle);
    container.appendChild(startNewGameButton);
    container.appendChild(inputNumberTextBox);
    container.appendChild(checkButton);
    container.appendChild(playerNameWrapper);
    container.appendChild(highScoresTitle);
    container.appendChild(loadScoresButton);
    container.appendChild(highScoresList);

    function startGame() {
        var randomNumber = randomIntFromInterval(1000, 9999);

        turns = 0;

        inputNumberTextBox.style.display = 'inline-block';

        checkButton.randomNumber = randomNumber;
        checkButton.style.display = 'inline-block';

        // console.log('random number = ' + randomNumber);
    }

    function resetParameters() {
        rams = 0;
        sheeps = 0;
    }

    function checkNumber(ev) {
        resetParameters();

        var playerNumber = inputNumberTextBox.value;
        var randomNumber = ev.target.randomNumber.toString();

        checkInputNumber();

        turns++;

        var ramPositions = [];

        for (var i = 0; i < playerNumber.length; i++) {
            var playerDigit = parseInt(playerNumber[i]);
            var randomDigit = parseInt(randomNumber[i]);

            if (playerDigit === randomDigit) {
                rams++;
                ramPositions.push(i);
            }
        }

        // Todo: create constant var for number length

        for (var i = 0; i < playerNumber.length; i++) {
            if (isRam(i, ramPositions)) {
                continue;
            }

            for (var j = 0; j < playerNumber.length; j++) {
                if (isRam(j, ramPositions)) {
                    continue;
                }

                playerDigit = parseInt(playerNumber[j]);
                randomDigit = parseInt(randomNumber[i]);

                if (playerDigit === randomDigit) {
                    sheeps++;
                    break;
                }
            }
        }

        if (rams === 4) {
            inputNumberTextBox.style.border = '1px solid green';

            checkButton.style.display = 'none';

            playerNameWrapper.style.display = 'block';

            saveButton.score = turns;
        }

        // console.log(rams);
        // console.log(sheeps);
    }

    function isRam(index, ramPositions) {
        return _.contains(ramPositions, index);
    }

    function loadScores(){
        var players = [];

        for (var key in localStorage){
            players.push({
                name: key,
                score: localStorage[key]
            });
        }

        var sortedByScore = _.sortBy(players, function(player) {
            return player.score;
        });

        sortedByScore.reverse();

        var listItem = document.createElement('li');

        highScoresList.innerHTML = '';

        _.each(sortedByScore, function(player){
            var item = listItem.cloneNode();

            item.innerHTML = player.name + ' ' + player.score;
            
            highScoresList.appendChild(item);
        });
    }

    function saveScore(ev) {
        localStorage[playerNameTextBox.value] = ev.target.score;
    }

    function checkInputNumber(number) {
        if (number < 1000 || number > 9999) {
            inputNumberTextBox.style.border = '1px solid red';

            throw 'Invalid number!';
        } else {
            inputNumberTextBox.style.border = '1px solid black';
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
