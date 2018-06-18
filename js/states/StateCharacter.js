import {oStateBattle} from "./StateBattle";

 function StateCharacter() {
     this.oWrapperCharacter = document.querySelector('#wrapperCharacter');
     this.oBGMusic = document.querySelector('#bgmCharacter');

     this.oPlayGame = document.querySelector('#btnPlay');
     this.oPlayGame.addEventListener('click', this.createFeilds.bind(this));

     this.oSexPlayer = document.querySelector('#sexes');
     this.oSexPlayer.addEventListener('change', this.chooseSex.bind(this));
     this.sex = 1;
     this.bodyRivals = ['hair', 'head', 'rightArm', 'torso', 'leftArm', 'legs'];

     this.oNamePlayer = document.querySelector('#settingInput');
}

StateCharacter.prototype.chooseSex = function (e) {
    this.sex = e.target.value;

    this.oCharacterPlayer = document.querySelector('#characterPlayer');
    for(let i = 0; i < this.oCharacterPlayer.children.length; i ++ ) {
        this.oCharacterPlayer.children[i].src = 'assets/img/player-' + this.sex + '/' + this.bodyRivals[i] + '.png';
    }
}

StateCharacter.prototype.createState = function () {
    this.oWrapperCharacter.classList.add('show');
    this.oBGMusic.play();
    this.oBGMusic.loop = true;
}

StateCharacter.prototype.createFeilds = function () {
    if(this.oNamePlayer.value) {
        this.oBGMusic.pause();
        this.oWrapperCharacter.classList.remove('show');
        oStateBattle.createFeild(this.sex, this.oNamePlayer.value, this.bodyRivals);
    } else {
        alert('Как мне к тебе обращаться? Введи свое имя ниже');
    }
}

export let oStateCharacter = new StateCharacter();




