"use strict";

/**
 * Объект еды
 * @type {{x: null, y: null, setFoodCoordinates(*): void, getFoodCoordinates(): *, isFoodPoint(*): *}}
 */
let food = {
    x: null,
    y: null,

    /**
     * Установка новых координат еды
     * @param point
     */
    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    /**
     * Получение координат еды
     * @returns {{x: *, y: *}}
     */
    getFoodCoordinates() {
        return {x: this.x, y: this.y};
    },

    /**
     * Проверка на то, совпадают ли координаты переданной точки с координатами еды
     * @param point
     * @returns {boolean}
     */
    isFoodPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};
