import {oTask} from "./task";

function StateBattle() {
    this.bestScore = 0;
    this.currentScore = 0;

    this.oBGMusic = document.querySelector('#bgmBattle');
    this.oShootingSound = document.querySelector('#shooting');
    this.oShootingSound.addEventListener('ended', function () {
        document.querySelector('#zombieLifeSound').play();
    });
    this.oPlrLifeDownSound = document.querySelector('#plrLifeDown');
    this.oZobieAttackSound = document.querySelector('#zombieAttackSound');
    this.oZobieAttackSound.addEventListener('ended', function () {
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    });
    this.oZLifeDownSound = document.querySelector('#zombieLifeSound');
    this.oZLifeDownSound.addEventListener('ended', function () {
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    });


    this.oPlrLifeUpSound = document.querySelector('#plrLifeUp');
    this.oPlrLifeUpSound.addEventListener('ended', function () {
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    });
    this.oLaught = document.querySelector('#laugh');
    this.oLaught.addEventListener('ended', function () {
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    });

    this.oGameOverMusic = document.querySelector('#gameOver');

    this.oFeild = document.querySelector('#wrapperFields');
    this.oPlayerPlace = document.querySelector('#player');
    this.oZombiePlace = document.querySelector('#zombie');
    this.oZombiePlace.addEventListener('animationend', function () {
        document.querySelector('#zombie').classList.remove('z-attack');
        document.querySelector('#plrLifeDown').play();
    });

    this.oPlayerName = document.querySelector('#playerName');
    this.oZombieName = document.querySelector('#zombieName');
    this.oNamesZombies = [
        ['сопливый', 'гнилой', 'жадный', 'милый'],
        ['фермер', 'пасечник', 'колдун', 'пахарь'],
        ['Генадий', 'Тит', 'Степан', 'Алекс']
    ];
    this.oNameZ = '';
    this.oTableWeapon = document.querySelector('#tableWeapon');
    this.oWeapon = document.querySelector('#weapon-1 img');
    this.oDrug = document.querySelector('#weapon-2 img');
    this.oTableWeapon.addEventListener('click', this.createTask.bind(this));

    this.oTableTask = document.querySelector('#tableTask');

    this.oZombieBar = document.querySelector('#zombieStatus');
    this.oPlrBar = document.querySelector('#plrStatus');

    this.oWeaponImg = document.querySelector('#imgWeapon');
    this.oWeaponImg.addEventListener('animationend', function () {
        document.querySelector('#imgWeapon').classList.remove('shoot');
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    });

    this.oBtnFire = document.querySelector('#btnFire');
    this.oBtnFire.addEventListener('click', this.fire.bind(this));

    this.oTableScore = document.querySelector('#tableScore');
    this.oBtnPlayAgain = document.querySelector('#btnAgain');
    this.oBtnPlayAgain.addEventListener('click', this.playAgain.bind(this))


    this.oPlrLife = 100;
}
StateBattle.prototype.playAgain = function () {
    this.oTableScore.classList.remove('show');
    this.oTableScore.classList.add('unshow');
    this.currentScore = 0;
    this.oPlrLife = 100;
    this.oPlrBar.style.width = this.oPlrLife + '%';
    oTask.removeChildren(this.oZombiePlace);
    this.createZombie(this.arrBody);
    this.giveZombieName();
    this.startFight();
}


StateBattle.prototype.createFeild = function (sex, namePl, bodyRivals) {
    this.oFeild.classList.add('show');
    this.arrBody = bodyRivals;
    this.createRivals(sex, bodyRivals, namePl);
    this.oBGMusic.play();
    this.oBGMusic.loop = true;

    this.startFight();
}

StateBattle.prototype.startFight = function () {
    this.oCountdown = document.createElement('div');
    this.oCountdown.classList.add('countdown');
    this.oFeild.appendChild(this.oCountdown);

    let count = 3;

    let countdown = setInterval(function() {
        document.querySelector('.countdown').innerHTML = count;
        count--;
    }, 1000);

    setTimeout(function() {
        clearInterval(countdown);
        let field = document.querySelector('#wrapperFields');
        field.removeChild(field.children[field.childElementCount - 1]);
        document.querySelector('#tableWeapon').classList.remove('unshow');
        document.querySelector('#tableWeapon').classList.add('show');
    }, 4000);
}

StateBattle.prototype.createTask = function (e) {
    if(e.target === this.oWeapon) {
        this.weaponStatus = 1;
        this.oTableWeapon.classList.remove('show');
        this.oTableWeapon.classList.add('unshow');
        this.oTableTask.classList.add('show');

        this.answer = '';
        this.answer = oTask.createMathEx();
    }
    if(e.target === this.oDrug) {
        this.weaponStatus = 0;
        this.oTableWeapon.classList.remove('show');
        this.oTableWeapon.classList.add('unshow');
        this.oTableTask.classList.add('show');

        this.answer = '';
        this.answer = oTask.createMathEx();
    }
}

StateBattle.prototype.fire = function () {
    this.oPlrAnswer = document.querySelector('#taskContainer input');
    let plrAnswer = Number(this.oPlrAnswer.value);
    if(this.oPlrAnswer.value) {
        if (this.answer === Number(plrAnswer)) {
            this.resultAttack(1);
        } else if (this.answer !== Number(plrAnswer)) {
            this.resultAttack(0);
        }
    } else {
            alert('Ведите свой ответ');
        }
}

StateBattle.prototype.resultAttack = function (result) {
    this.oTableTask.classList.remove('show');
    this.oTableTask.classList.add('unshow');

    if(result) {
        if(this.weaponStatus) {
            if(this.oZomieLife < 21) {
                this.currentScore++;
                oTask.removeChildren(this.oZombiePlace);
                this.createZombie(this.arrBody);
                this.giveZombieName();
                this.startFight();
            } else {
                this.oZomieLife -= 20;
                this.oWeaponImg.classList.add('shoot');
                this.oShootingSound.play();
            }
        } else {
            if(this.oPlrLife > 86) {
                this.oPlrLife = 100;
                this.oPlrLifeUpSound.play();
            } else {
                this.oPlrLife += 15;
                this.oPlrLifeUpSound.play();
            }
        }
        this.oZombieBar.style.width = this.oZomieLife + '%';
        this.oPlrBar.style.width = this.oPlrLife + '%';
    } else {
        if (this.weaponStatus) {
            if(this.oPlrLife < 21) {
                this.createTableScore();
            } else {
                this.oZombiePlace.classList.add('z-attack');
                this.oZobieAttackSound.play();
                this.oPlrLife -= 20;}
        } else {
            if(this.oZomieLife > 96) {
                this.oZomieLife = 100;
                this.oPlrLife -= 5;
                this.oLaught.play();
            } else {
                this.oZomieLife += 5;
                this.oLaught.play();
            }
        }
        this.oPlrBar.style.width = this.oPlrLife + '%';
        this.oZombieBar.style.width = this.oZomieLife + '%';
    }
}

StateBattle.prototype.createTableScore = function () {
    this.oTableWeapon.classList.remove('show');
    this.oTableWeapon.classList.add('unshow');
    this.oGameOverMusic.play();
    this.oTableScore.classList.remove('unshow');
    this.oTableScore.classList.add('show');

    if(this.bestScore < this.currentScore) {
        this.bestScore = this.currentScore;
    }
    document.querySelector('#bestScoreField').innerHTML = this.bestScore;
    document.querySelector('#currentScoreField').innerHTML = this.currentScore;
}

StateBattle.prototype.createRivals = function (sex, bodyRivals, namePl) {
    this.createPlayer(sex, bodyRivals);
    this.createZombie(bodyRivals);

    this.givePlayerName(namePl);
    this.giveZombieName();
}

StateBattle.prototype.givePlayerName = function(namePl) {
    this.oPlayerName.innerHTML = namePl;
}

StateBattle.prototype.giveZombieName = function() {
    this.oNameZ = '';
    for(let i = 0; i < this.oNamesZombies.length; i++){
            this.oNameZ += this.oNamesZombies[i][Math.floor(Math.random() * (0, this.oNamesZombies[i].length))] + ' ';
    }
    this.oZombieName.innerHTML = this.oNameZ;
}

    StateBattle.prototype.createPlayer = function (sex, bodyRivals) {
    for (let i = 0; i < bodyRivals.length; i++){
        this.oPartBody = document.createElement('img');
        this.oPartBody.classList.add('player-' + bodyRivals[i]);
        this.oPartBody.src = 'assets/img/player-' + sex + '/' + bodyRivals[i] + '.png';
        this.oPlayerPlace.appendChild(this.oPartBody);
    }
}

StateBattle.prototype.createZombie = function (bodyRivals) {
    for (let i = 0; i < bodyRivals.length; i++){
        this.oPartBody = document.createElement('img');
        this.oPartBody.classList.add('zombie-' + bodyRivals[i]);
        this.oPartBody.src = 'assets/img/zombie/zombie-' + bodyRivals[i] + Math.floor(Math.random() * (0 - 3)) + '.png';
        this.oZombiePlace.appendChild(this.oPartBody);
    }
    this.oZomieLife = 100;
}



export let oStateBattle = new StateBattle();
