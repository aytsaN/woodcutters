function Task() {
    this.oTaskContainer = document.querySelector('#taskContainer');
}

Task.prototype.createMathEx = function () {

    if(this.oTaskContainer.hasChildNodes()) {
        this.removeChildren(this.oTaskContainer);
    }

    let firstNumber, firstCommand, secondNumber, rightAnswer;
    let arrCommands = ['+', '-']

    this.firstNum = document.createElement('span');
    firstNumber = Math.ceil(Math.random() * (0, 999))
    this.firstNum.innerHTML = firstNumber;
    this.oTaskContainer.appendChild(this.firstNum);

    this.command = document.createElement('span');
    firstCommand = arrCommands[Math.floor(Math.random() * (0, 2))];
    this.command.innerHTML = firstCommand;
    this.oTaskContainer.appendChild(this.command);

    this.secondNum = document.createElement('span');
    secondNumber = Math.ceil(Math.random() * (998 - firstNumber, 999 - firstNumber));
    this.secondNum.innerHTML = secondNumber;
    this.oTaskContainer.appendChild(this.secondNum);

    this.equals = document.createElement('span');
    this.equals.innerHTML = '=';
    this.oTaskContainer.appendChild(this.equals);

    this.inAnswer = document.createElement('input');
    this.inAnswer.setAttribute('type', 'text');
    this.oTaskContainer.appendChild(this.inAnswer);

    if(firstCommand === arrCommands[0]) {
        rightAnswer = firstNumber + secondNumber;
    } else {
        rightAnswer = firstNumber - secondNumber;
    }

    return rightAnswer;
}

Task.prototype.removeChildren = function(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}

export const oTask = new Task();