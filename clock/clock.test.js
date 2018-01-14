describe('clock tests', () => {
    //todo: custom karma html so we can import templates
    window.customElements.define('x-clock', XClock);

    let setup = () => {
            sut = new XClock();
        },
        teardown = () => {
            sut = null;
        },
        sut;

    beforeEach(setup);
    afterEach(teardown);

    it('should throw an error when a time value set is not a number', () => {
        let wrap = () => {
            sut.time = 'abc';
        };

        expect(wrap).toThrow();
    });

    it('start should launch the clock', () => {
        sut.start();
        expect(sut.timerId).toEqual(jasmine.any(Number));
    });

    it('start should not launch the clock when it has been already started', () => {
        sut.start();

        let { timerId } = sut;

        sut.start();
        expect(sut.timerId).toEqual(timerId);
    });

    describe('stopping clock', () => {
        beforeEach(() => sut.start());

        it('stop should stop the clock', () => {
    
            sut.stop();
            expect(sut.timerId).toBeNull();
        });
    });
});
