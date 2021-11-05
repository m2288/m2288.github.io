"use strict";

/**
 * Глобальный объект игры
 * @type {{play(): void, settings: ({colsCount, rowsCount, winLength, speed, validate}|{colsCount, rowsCount, winLength, speed}), init(*=): (undefined), keyDownHandler(*): (undefined), renderer: ({renderMap, cells, render}|{generateWall, getSquare, clearUserPosition, renderUserPosition, generateTable, render}|{clear, map, render}|{renderChessBoard, generateChessBoard}), tickInterval: null, changePlayButton(*, *=): void, snake: ({init, makeStep, isBodyPoint, incrementBody, maxY, maxX, lastStepDirection, getNextStepHeadPoint, body, setDirection, direction}|{init, makeStep, isBodyPoint, incrementBody, lastStepDirection, getNextStepHeadPoint, body, setDirection, direction}), getDirectionByCode(*): (string), canSnakeMakeStep(): *, food: {x, y, setFoodCoordinates, getFoodCoordinates, isFoodPoint}, setEventHandlers(): void, newGameClickHandler(): void, getStartSnakePoint(): *, canSetDirection(*): *, isGameWon(): *, tickHandler(): (undefined), stop(): void, reset(): void, finish(): void, getRandomCoordinates(): (*|undefined), render(): void, playClickHandler(): void, status: string}}
 */
let game = {
    settings,
    renderer,
    snake,
    food,
    tickInterval: null,
    status,
    points,

    /**
     * Инициализация игры (установка начальных значений и настроек)
     * @param userSettings
     */
    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        if( !this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.setEventHandlers();

        this.snake.init(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());

        this.reset();
    },

    /**
     * Сброс игры
     */
    reset() {
        this.stop();
        this.snake.init(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());
        this.render();
    },

    /**
     * Отрисовка змейки и еды (функция создана, чтобы не переносить эту длинную строку каждый раз везде)
     */
    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
    },

    /**
     * Запуск игры
     */
    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval( () => game.tickHandler(), 1000 / this.settings.speed);
        this.changePlayButton('Стоп');
    },

    /**
     * Функция, которая вызывается каждый тик таймера
     */
    tickHandler() {

        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if(this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.incrementBody();
            this.snake.incrementPoints()
            
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            if(this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    /**
     * Проверка на победу
     * @returns {boolean}
     */
    isGameWon() {
        return this.snake.body.length >= this.settings.winLength;
    },

    /**
     * Окончание игры (проигрыш)
     */
    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    /**
     * Остановка игры
     */
    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.changePlayButton('Старт');

    },

    /**
     * Получение стартовой позиции для головы змейки
     * @returns {{x: number, y: number}}
     */
    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2)
        }
    },

    /**
     * Смена надписи для кнопки
     * @param textContent
     * @param isDisabled
     */
    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    /**
     * Получение новой координаты для еды
     * @returns {{x: number, y: number}}
     */
    getRandomCoordinates() {
        let exclude = [...this.snake.body, this.food.getFoodCoordinates()];

        while(true) {
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            let excludeContainsRndPoint = exclude.some(function (elem) {
                return rndPoint.x === elem.x && rndPoint.y === elem.y;
            });

            if(!excludeContainsRndPoint) {
                return rndPoint;
            }
        }
    },

    /**
     * Обработчик нажатия на кнопку "Старт/Стоп"
     */
    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    /**
     * Функция, навешивающая обработчики событий в игре
     */
    setEventHandlers() {
        document.getElementById('GameSettingsButton').onclick =  function () {
            settings.setGameSettings();
        };
        document.getElementById('playButton').onclick =  function () {
            game.playClickHandler();
        };
        document.addEventListener('keydown', () => this.keyDownHandler(event));
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
    },

    /**
     * Обработчик нажатия на кнопку "Новая игра"
     */
    newGameClickHandler() {
        document.getElementById("points").innerHTML = 0;
        this.reset();
    },

    /**
     * Обработчик события keydown (нажатий на кнопки направлений)
     * @param event
     */
    keyDownHandler(event) {
        if(!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if(this.canSetDirection(direction)) {
            this.snake.setDirection(direction)
        }
    },

    /**
     * Проверка на то, можно ли установить передаваемое направление для змейки
     * @param direction
     * @returns {boolean}
     */
    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
            direction === 'right' && this.snake.lastStepDirection !== 'left' ||
            direction === 'down' && this.snake.lastStepDirection !== 'up' ||
            direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    /**
     * Получение строкого направления по коду клавиши
     * @param code
     * @returns {string}
     */
    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            
            
            default:
                return '';
        }
    },

    /**
     * Проверка на то, может ли змейка попасть на следующую клетку
     * @returns {boolean}
     */
    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isBodyPoint(nextHeadPoint) 
          && nextHeadPoint.x < this.settings.colsCount &&
            nextHeadPoint.y < this.settings.rowsCount &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },
};

/**
 * Инициализация игры по событию onload
 */
window.onload = function () {
    game.init({speed: 3, winLength: 10, rowsCount: 21, colsCount: 21});
};

