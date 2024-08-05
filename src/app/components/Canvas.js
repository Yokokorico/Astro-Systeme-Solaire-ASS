export class Canvas
{
    _canvas;
    _ctx;

    constructor(id)
    {
        this.addToDOM(id),
        this._canvas = document.querySelector(`#${id}`),
        this._ctx = this._canvas.getContext('webgl'),
        this.onResize(),
        this._clearColor = {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            o: 1.0,
        },
        this.clear()
    }

    addToDOM(id)
    {
        document.body.appendChild(document.createElement('canvas')).setAttribute('id', id);
    }

    getCanvas()
    {
        return this._canvas;
    }
    getCtx()
    {
        return this._ctx;
    }

    getWidth()
    {
        return this._canvas.width;
    }

    getHeight()
    {
        return this._canvas.height;
    }

    onResize()
    {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._ctx.viewport(0, 0, this._canvas.width, this._canvas.height);
        // set the viewport to the center of the canvas
    }

    clear()
    {
        this._ctx.clearColor(
            this._clearColor.r,
            this._clearColor.g,
            this._clearColor.b,
            this._clearColor.o
        );
        this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
    }
}