class XClock extends HTMLElement {
    static get observedAttributes() {
        return ['time'];
    }

    static get tickSpan() {
        return 1000;
    }

    get time() {
        return this.milliseconds;
    }

    set time(value) {
        if (isNaN(value)) {
            throw new Error('time should be a numeric value');
        } else {
            let valueAsDate = new Date(value);

            this.milliseconds = value;
            this.hours = valueAsDate.getHours();
            this.minutes = valueAsDate.getMinutes();
            this.seconds = valueAsDate.getSeconds();
        }
    }

    constructor() {
        super();
    }

    _appendTpl() {
        let root = this.attachShadow({ mode: 'open' });
        let tplHtml = document.importNode(XClock.tpl.content, true);

        root.appendChild(tplHtml);
    }

    _tick() {
        this.time = this.milliseconds + XClock.tickSpan;

        let secondRotation = 6 * this.seconds;
        let minuteRotation = 6 * this.minutes;
        let hourRotation = 360 / 12 * this._24To12(this.hours);

        this.arrows.second.setAttribute(
            'transform',
            `rotate(${secondRotation} 150 150)`
        );
        this.arrows.minute.setAttribute(
            'transform',
            `rotate(${minuteRotation} 150 150)`
        );
        this.arrows.hour.setAttribute(
            'transform',
            `rotate(${hourRotation} 150 150)`
        );

        this._fireEvent('tick');
    }

    _24To12(hours) {
        return hours % 12;
    }

    _fireEvent(name) {
        let evt = new Event(name, { bubbles: true, cancelable: false });
        this.dispatchEvent(evt);
    }

    connectedCallback() {
        this._appendTpl();

        this.arrows = {
            hour: this.shadowRoot.querySelector('.hour-arrow'),
            minute: this.shadowRoot.querySelector('.minute-arrow'),
            second: this.shadowRoot.querySelector('.second-arrow')
        };

        this.time = this.time !== undefined ? this.time : Date.now();

        this._tick();
        this.timerId = setInterval(this._tick.bind(this), XClock.tickSpan);
    }

    disconnectedCallback() {
        clearInterval(this.timerId);
        console.log('disconnected!');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.time = parseInt(newValue);
    }
}