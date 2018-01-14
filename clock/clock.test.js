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

    it('should throw an error when a ti value set is not a number', () => {
        let wrap = () => {
            sut.time = 'abc';
        };

        expect(wrap).toThrow();
    });
});
