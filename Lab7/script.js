function playAnimation() {
    document.getElementById('work').style.display = 'block';
}

function closeAnimation() {
    document.getElementById('work').style.display = 'none';
    cancelAnimationFrame(animationId);
    repositionSquare(square1, true);
    repositionSquare(square2, false);
    document.getElementById('work').style.display = 'none';
    actionButton.textContent = 'Start';
}


document.addEventListener('DOMContentLoaded', function () {
    var animContainer = document.getElementById('anim');
    var actionButton = document.getElementById('actionButton');

    var square1, square2;
    var animationId;
    var speed = 2;
    var squareSize = 15;

    function logMessage(message) {
        var log = document.getElementById('log');
        log.innerHTML += message + '<br>';
        log.scrollTop = log.scrollHeight;
    }

    function createSquare(color, isTop) {
        var square = document.createElement('div');
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';
        square.style.backgroundColor = color;
        square.style.position = 'absolute';
        square.style.left = Math.random() * (animContainer.offsetWidth - squareSize) + 'px';
        square.style.top = isTop ? '0px' : (animContainer.offsetHeight - squareSize - 10) + 'px';

        var angle = Math.random() * 2 * Math.PI;
        square.velocity = {
            x: speed * Math.cos(angle),
            y: speed * Math.sin(angle)
        };
        animContainer.appendChild(square);
        return square;
    }

    function repositionSquare(square, isTop) {
        square.style.left = Math.random() * (animContainer.offsetWidth - squareSize) + 'px';
        square.style.top = isTop ? '0px' : (animContainer.offsetHeight - squareSize - 10) + 'px';
        var angle = (Math.random() * 60 + 15) * (Math.PI / 180);
        square.velocity = {
            x: speed * Math.cos(angle),
            y: speed * Math.sin(angle)
        };
    }

    function moveSquare(square) {
        var nextX = square.offsetLeft + square.velocity.x;
        var nextY = square.offsetTop + square.velocity.y;

        if (nextX < 0 || nextX + squareSize > animContainer.offsetWidth) {
            square.velocity.x *= -1;
            logMessage('Квадрат торкнувся бокової стінки');
        }
        if (nextY < 0 || nextY + squareSize > animContainer.offsetHeight - 10) {
            square.velocity.y *= -1;
            logMessage('Квадрат торкнувся верхньої/нижньої стінки');
        }

        square.style.left = square.offsetLeft + square.velocity.x + 'px';
        square.style.top = square.offsetTop + square.velocity.y + 'px';
    }

    function checkCollisionAndRepel() {
        var rect1 = square1.getBoundingClientRect();
        var rect2 = square2.getBoundingClientRect();

        if (!(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
            var dx = (rect1.left + squareSize / 2) - (rect2.left + squareSize / 2);
            var dy = (rect1.top + squareSize / 2) - (rect2.top + squareSize / 2);
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < squareSize) {
                logMessage('Квадрати зіткнулися');
                square1.velocity.x *= -1;
                square1.velocity.y *= -1;
                square2.velocity.x *= -1;
                square2.velocity.y *= -1;

                var overlap = squareSize - distance;
                var moveX = (dx / distance) * overlap;
                var moveY = (dy / distance) * overlap;

                square1.style.left = (square1.offsetLeft + moveX) + 'px';
                square1.style.top = (square1.offsetTop + moveY) + 'px';
                square2.style.left = (square2.offsetLeft - moveX) + 'px';
                square2.style.top = (square2.offsetTop - moveY) + 'px';
            }
        }
    }

    function animate() {
        moveSquare(square1);
        moveSquare(square2);
        checkCollisionAndRepel();
        animationId = requestAnimationFrame(animate);
    }

    function startGame() {
        if (!square1 || !square2) {
            square1 = createSquare('green', true);
            square2 = createSquare('orange', false);
        }
        animate();
    }

    function reloadGame() {
        cancelAnimationFrame(animationId);
        repositionSquare(square1, true);
        repositionSquare(square2, false);
        actionButton.textContent = 'Start';
    }

    actionButton.addEventListener('click', function () {
        logMessage('Натиснуто кнопку: ' + this.textContent);
        if (actionButton.textContent === 'Start') {
            actionButton.textContent = 'Reload';
            startGame();
        } else {
            reloadGame();
        }
    });

    actionButton.addEventListener('click', function () {
        if (actionButton.textContent === 'Start') {
            playAnimation();
        }
    });

    closeButton.addEventListener('click', function () {
        cancelAnimationFrame(animationId);
        repositionSquare(square1, true);
        repositionSquare(square2, false);
        document.getElementById('work').style.display = 'none';
        actionButton.textContent = 'Start';
        logMessage('Натиснуто кнопку: ' + this.textContent);
        document.getElementById('work').style.display = 'none';
    });

});
