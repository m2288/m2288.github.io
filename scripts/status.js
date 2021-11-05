"use strict";
/**
 * Объект состояния игры
 * @type {{condition: null, isPlaying(): *, isStopped(): *, setStopped(): void, setPlaying(): void, setFinished(): void}}
 */
let status = {
    /**
     * Текущее состояние
     */
    condition: null,

    /**
     * Установка состояния "Игра"
     */
    setPlaying() {
        this.condition = 'playing';
    },

    /**
     * Установка состояния "Стоп"
     */
    setStopped() {
        this.condition = 'stopped';
        },

    /**
     * Установка состояния "Финиш"
     */
    setFinished() {
        this.condition = 'finished';
        snake.points = 0;
        document.getElementById("points").innerHTML = 0;
        alert("Конец игры");
    },

    /**
     * Проверка на то, является ли текущее состояние состоянием "Игра"
     * @returns {boolean}
     */
    isPlaying() {
        return this.condition === 'playing';
    },

    /**
     * Проверка на то, является ли текущее состояние состоянием "Стоп"
     * @returns {boolean}
     */
    isStopped() {
        return this.condition === 'stopped';
    }
};
