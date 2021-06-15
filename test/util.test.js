for (let index = 0; index < 100; index++) {
    test('random 1 between 10 ', () => {
        // expect(random(1, 10)).toBeWithinRange(1, 10);
    })
}

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            }
        } else {
            return {
                message: () =>
                    `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            }
        }
    },
})
