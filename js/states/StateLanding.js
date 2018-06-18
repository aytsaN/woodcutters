import {oStateCharacter} from './StateCharacter';

export function StateLanding() {
    this.oWpapperLanding = document.querySelector('#wpapperLanding');
    this.btnStart = document.querySelector('#btnStart');


}

StateLanding.prototype.createBtnEvents = function() {
    this.btnStart.addEventListener('click', this.startGame.bind(this));
}

StateLanding.prototype.startGame = function() {
    this.oWpapperLanding.classList.remove('show');
    oStateCharacter.createState();
}


window.onload = () => {
    let oStateLanding = new StateLanding();
    oStateLanding.createBtnEvents();
}


