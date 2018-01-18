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

    describe('starting clock', () => {
        afterEach(() => sut.stop());

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

        it('start should set the time property to current time if it is not defined', () => {
            sut.start();

            //hmmm.....
            expect(sut.time).toBeCloseTo(Date.now());
        });
    });

    describe('stopping clock', () => {
        beforeEach(() => sut.start());

        it('stop should stop the clock', () => {
            sut.stop();
            expect(sut.timerId).toBeNull();
        });
    });

    describe('ticks', () => {
        beforeEach(() => {
            jasmine.clock().install();
        });

        afterEach(() => {
            jasmine.clock().uninstall();
        });

        it('should change the time property value accordingly to the timespan passed', () => {
            sut.time = 40000;
            sut.start();

            jasmine.clock().tick(1000);
            expect(sut.time).toEqual(41000);
        });
    });
});
