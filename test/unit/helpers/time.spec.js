import { Date2Cron, IsDaylightSavings, SubtractMinutes } from "../../../src/helpers/time.js"

// Date2Cron()
describe("Date to Cron Testing", () => {
    test("Implicit date parameter returns a string", () => {
        const actual = Date2Cron()
        expect(typeof actual).toEqual("string")
    })

    test("Returns a valid cron string", () => {
        const date = new Date("2000-01-01T12:00:00")
        const actual = Date2Cron(date)
        expect(actual).toEqual("0 12 1 1 6")
    })

    test("Returns an error for invalid parameter type", () => {
        expect(() => {
            Date2Cron("test")
        }).toThrow(TypeError)
    })
})

// IsDaylightSavings()
describe("Daylight Savings Testing", () => {
    test("Implicit date parameter returns a boolean", () => {
        const actual = IsDaylightSavings()
        expect(typeof actual).toEqual("boolean")
    })

    test("Returns input DST date as true", () => {
        const dstDate = new Date("2000-07-01")
        const actual = IsDaylightSavings(dstDate)
        const expected = true
        expect(actual).toEqual(expected)
    })
    test("Returns input DST date as false", () => {
        const dstDate = new Date("2000-12-01")
        const actual = IsDaylightSavings(dstDate)
        const expected = false
        expect(actual).toEqual(expected)
    })
})

// SubtractMinutes()
describe("Subtract Minutes Testing", () => {
    test("Returns epoch time number of subtracted minutes", () => {
        const date = new Date("2000-01-01T01:00:00")
        const actual = SubtractMinutes(date,60)
        const expected = new Date("2000-01-01T00:00:00")
        expect(actual).toEqual(expected)
    })
    test("Returns an error for invalid parameter type", () => {
        expect(() => {
            SubtractMinutes("test", 1)
        }).toThrow(TypeError)
    })
})