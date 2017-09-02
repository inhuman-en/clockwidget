(function () {
    let tpl = document.currentScript.ownerDocument.querySelector('#clockTpl');

    class XClock extends HTMLElement {

        get time () {

        }

        set time (value) {
            this.hours = value.getHours();
            this.minutes = value.getMinutes();
            this.seconds = value.getSeconds();
        }

        constructor() {
            super();
        }

        _appendTpl () {
            let root = this.attachShadow({ mode: "open" });
            let tplHtml = document.importNode(tpl.content, true);

            root.appendChild(tplHtml);
        }

        _tick () {
            this.time = new Date();

            let secondRotation = 6*this.seconds;
            let minuteRotation = 6*this.minutes;
            let hourRotation = (360/24)*this.hours;

            this.arrows.second.setAttribute("transform", `rotate(${secondRotation} 150 150)`);
            this.arrows.minute.setAttribute("transform", `rotate(${minuteRotation} 150 150)`);
            this.arrows.hour.setAttribute("transform", `rotate(${hourRotation} 150 150)`);

            //todo: fire tick event
        }
    
        connectedCallback() {
            this._appendTpl();

            this.arrows = {
                hour: this.shadowRoot.querySelector(".hour-arrow"),
                minute: this.shadowRoot.querySelector(".minute-arrow"),
                second: this.shadowRoot.querySelector(".second-arrow")
            };

            this._tick();
            this.timerId = setInterval(this._tick.bind(this), 1000);
        }
    
        disconnectedCallback() {
            clearInterval(this.timerId);
            console.log("disconnected!");
        }
    }

    window.customElements.define("x-clock", XClock);

})();