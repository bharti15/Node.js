var target;
var color;
var guess_input;
var finished = false;
var guesses = 0;

function do_game() {

    color = ["blue", "cyan", "gold", "gray", "green", "magenta", "orange", "red", "white", "yellow"];
    var random_number = Math.random() * 10;
    var random_number_integer = Math.floor(random_number);
    target = color[random_number_integer];

    while (!finished) {
        guess_input = prompt("I am thinking of one of these colors: \n\n"+ color + "\n\nWhat color am I thinking of?");
        guesses += 1;
        finished = check_guess();
    }
}

function check_guess() {
    if (color.indexOf(guess_input) < 0) {
        // alert("I don't recognise your color.\n\n Please try again.");
        return false;
    }
    if (guess_input > target) {
        // alert("Sorry, your guess is not correct! \n\n Hint: your color is alphabetically higher than mine! \n\n Please try again.");
        return false;
    }
    if (guess_input < target) {
        // alert("Sorry, your guess is not correct! \n\n Hint: your color is alphabetically lower than mine! \n\n Please try again.");
        return false;
    }
    document.body.style.backgroundColor = target;
    alert("Congratulations! You have guessed the color!\n\nIt took you " + guesses +" guesses to finish the game!\n\nYou can see the color in the background.");
    return true;
}
