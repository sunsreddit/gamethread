import { Date2Cron, IsDaylightSavings, SubtractMinutes } from "../../../src/helpers/time.js"

// Date2Cron()
describe("Date to Cron Testing", () => {
    test("Returns a valid cron string", () => {
        const date = new Date("2000-01-01T12:00:00")
        const result = Date2Cron(date)
        expect(result).toEqual('0 12 1 1 6')
    })
    test("Returns an invalid input error", () => {
        expect(() => {
            Date2Cron(1)
        }).toThrowError
    })
})

// IsDaylightSavings()
describe("Daylight Savings Testing", () => {
    test("Returns input DST date as true", () => {
        const dstDate = new Date("2000-07-01")
        const result = IsDaylightSavings(dstDate)
        expect(result).toEqual(true)
    })
    test("Returns input DST date as false", () => {
        const dstDate = new Date("2000-12-01")
        const result = IsDaylightSavings(dstDate)
        expect(result).toEqual(false)
    })
})

// SubtractMinutes()
describe("Subtract Minutes Testing", () => {
    test("Returns epoch time number of subtracted minutes", () => {
        const date = new Date("2000-01-01T01:00:00")
        const result = SubtractMinutes(date,60)
        expect(result).toEqual(new Date("2000-01-01T00:00:00"))
    })
    test("Returns an error for invalid parameter type", () => {
        expect(() => {
            SubtractMinutes("test", 1)
        }).toThrowError(`Parameter is not of type 'Date'`)
    })
})