function createRectangle(x, y) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.setAttribute('height', 20);
    el.setAttribute('width', 20);
    el.setAttribute('fill', 'rgb(0,0,0)');
    $(el).click(function () {
        el.setAttribute('fill', 'rgb(255,0,0)');
    });
    document.getElementById('pattern-canvas').appendChild(el);
}

$(document).ready(function () {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            createRectangle(25 * j + 10, 25 * i + 10);
        }
    }
});