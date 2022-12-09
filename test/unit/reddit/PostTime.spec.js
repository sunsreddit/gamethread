import { IsPostTime, PostCron, PostTime } from "../../../src/reddit/PostTime.js"

// IsPostTime()
describe("IsPostTime & PostTime Testing", () => {
    test("Returns ParameterType error", () => {
        expect(IsPostTime).toThrowError(TypeError)
    })
    test("Returns a boolean type value", () => {
        const gameTime = new Date("2022-12-01T19:00:00")
        const actual = IsPostTime(gameTime)
        const expected = "boolean"
        expect(typeof actual).toEqual(expected)
    })
    test("Return a false value", () => {
        const gameTime = new Date("1999-01-01T12:00:00")
        const actual = IsPostTime(gameTime)
        const expected = false
        expect(actual).toEqual(expected)
    })
    test("Return a true value", () => {
        const gameTime = new Date("2035-12-01T09:00:00")
        const actual = IsPostTime(gameTime)
        const expected = true
        expect(actual).toEqual(expected)
    })
})

// PostCron()
describe("PostCron Testing", () => {
    test("Returns ParameterType error", () => {
        expect(PostCron).toThrowError(TypeError)
    })
    test("Returns a string value", () => {
        const date = new Date()
        const actual = PostCron(date)
        const expected = "string"
        expect(typeof actual).toEqual(expected)
    })
})

// PostTime()
describe("PostTime Testing", () => {
    test("Returns ParameterType error", () => {
        expect(PostTime).toThrowError(TypeError)
    })
    test("Returns a post time with DST", () => {
        const date = new Date("2000-01-01T15:00:00")
        const actual = (PostTime(date))
        const expected = new Date(date.setMinutes(date.getMinutes() - 120))
        expect(actual).toEqual(expected)
    })
    test("Returns a post time without DST", () => {
        const date = new Date("2000-07-01T15:00:00")
        const actual = (PostTime(date))
        const expected = new Date(date.setMinutes(date.getMinutes() - 180))
        expect(actual).toEqual(expected)
    })
})