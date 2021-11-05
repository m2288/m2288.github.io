"use strict";

/**
 * Константы для ограничения значений настроек
 * @type {number}
 */
const MAX_MAP_SIZE = 30;
const MIN_MAP_SIZE = 10;
const MAX_SPEED_SIZE = 10;
const MIN_SPEED_SIZE = 1;
const MAX_WIN_SIZE = 50;
const MIN_WIN_SIZE = 5;


/**
 * Объект настроек
 * @type {{colsCount: number, rowsCount: number, winLength: number, speed: number, validate(): boolean}}
 */
let settings = {
     rowsCount: 21,
     colsCount: 21,
     speed: 2,
     winLength: 50,

     setGameSettings(){
        let rCt = +prompt("Количество строк, мин. 10, макс. 30");
        let cCt = +prompt("Количество столбцов, мин. 10, макс. 30");
        let spt = +prompt("Скорость игры, мин. 1, макс. 10");
        let pCt = +prompt("Количество счета игры, мин. 5, макс. 50");
        
        if (typeof(rCt=="number") && !isNaN(rCt)) {
            game.init({rowsCount: rCt});

        }
        if (typeof(cCt=="number") &&  !isNaN(cCt)) {
            game.init({colsCount: cCt});
            
        }
        if (typeof(spt=="number") && !isNaN(spt)) {
            game.init({speed: spt});
            
        }
        if (typeof(pCt=="number") && !isNaN(pCt)) {
            game.init({winLength: pCt+1});
            
        }

        console.log("settings");
     }, 

    /**
     * Метод проверки настроек на валидность
     * @returns {boolean}
     */
     validate() {
         if (this.rowsCount < MIN_MAP_SIZE || this.rowsCount > MAX_MAP_SIZE) {
             console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
             return false;
         }

         if (this.colsCount < MIN_MAP_SIZE || this.colsCount > MAX_MAP_SIZE) {
             console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
             return false;
         }

         if (this.speed < MIN_SPEED_SIZE || this.speed > MAX_SPEED_SIZE) {
             console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
             return false;
         }

         if (this.winLength < MIN_WIN_SIZE || this.winLength > MAX_WIN_SIZE) {
             console.error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
             return false;
         }

         return true;
     }
 };
