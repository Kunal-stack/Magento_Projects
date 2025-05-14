/* app/code/KunalUpadhyay/SecondFooter/view/frontend/web/js/guessing-game.js */
define(['jquery','mage/translate'], function($) {
    'use strict';

    return function(config, element) {
        var randomNumber = Math.floor(Math.random() * 50) + 1;
        var guessedNumbers = [];

        // Modal handling
        var modal = $('#guessing-game-modal');
        var openModalButton = $('.open-modal-button');
        var closeModalButton = $('.close-button');

        openModalButton.on('click', function() {
            modal.show();
        });

        closeModalButton.on('click', function() {
            modal.hide();
        });

        $(window).on('click', function(event) {
            if ($(event.target).is(modal)) {
                modal.hide();
            }
        });

        // Game logic
        $('#guess-button').on('click', function() {
            var userGuess = parseInt($('#guess-input').val());
            var feedbackMessage = $('#feedback-message');

            if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
                feedbackMessage.text($.mage.__('Please enter a valid number between 1 and 50.'));
                return;
            }

            guessedNumbers.push(userGuess);

            if (userGuess < randomNumber) {
                feedbackMessage.text($.mage.__('The number entered was below the random number.'));
            } else if (userGuess > randomNumber) {
                feedbackMessage.text($.mage.__('The number entered was above the random number.'));
            } else {
                feedbackMessage.text($.mage.__('Congratulations! You guessed the correct number.'));
                displayGuessedNumbers();
                // Reset the game
                randomNumber = Math.floor(Math.random() * 50) + 1;
                guessedNumbers = [];
            }
        });

        function displayGuessedNumbers() {
            var guessedNumbersDiv = $('#guessed-numbers');
            guessedNumbersDiv.empty();
            guessedNumbersDiv.append('<h3><?= __("Your guesses:") ?></h3>');
            var list = $('<ul></ul>');
            guessedNumbers.forEach(function(number, index) {
                var listItem = $('<li></li>').text(number);
                if (index === guessedNumbers.length - 1) {
                    listItem.css('font-weight', 'bold');
                }
                list.append(listItem);
            });
            guessedNumbersDiv.append(list);
        }
    }
});
