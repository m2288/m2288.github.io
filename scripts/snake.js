"use strict";

/**
 * Объект змейки
 * @type {{init(*, *): void, makeStep(): void, isBodyPoint(*): *, incrementBody(): void, lastStepDirection: null, getNextStepHeadPoint(): *, body: null, setDirection(*): void, direction: null}}
 */
let snake = {
    /**
     * Тело (массив клеток тела: голова + хвост)
     */
    body: null,
    /**
     * Тело (массив клеток тела: голова + хвост)
     */
    points: 0,
    /**
     * Направление движения
     */
    direction: null,
    /**
     * Предыдущее направление движения
     */
    lastStepDirection: null,

    /**
     * Рождение змейки (инициализация значений)
     * @param startPoint
     * @param direction
     */
    init(startPoint, direction) {
        this.body = [startPoint];
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    /**
     * Получение координат следующей точки головы змеи (той точки, если змейка сделает 1 шаг по тому направлению,
     * которое у нее сейчас)
     * @returns {*}
     */
    getNextStepHeadPoint() {
        let firstPoint = this.body[0];
             
        

        switch (this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'left' :
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },

    /**
     * Метод перемещения змейки на 1 клетку в заданном направлении
     */
    makeStep() {
        //[{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}]
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    /**
     * Метод увеличения тела после поедания клетки с едой
     */
    incrementBody() {
        let lastBodyIdx = this.body.length - 1;
        let lastBodyPoint = this.body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },

    /**
     * Метод увеличения и отображение счета после поедания клетки с едой
     */
    incrementPoints() {
        
        snake.points++;
        document.getElementById("points").innerHTML = snake.points;
    },

    

    /**
     * Установка направления
     * @param direction
     */
    setDirection(direction) {
        this.direction = direction;
    },

    /**
     * Проверка, является ли переданная точка одной из точек массива тела змейки
     * @param point
     * @returns {boolean}
     */
    isBodyPoint(point) {
       
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },
};
