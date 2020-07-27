import { formatCardNumber, formatExpiryDate, getCardType, hasReachedMaximumLength, isNumeric } from "./utils";
import { CARD_TYPES } from "./consts";

describe("getCardType()", () => {
    it("should return CARD_TYPES.NONE if cardNumber doesn't match to defined card types", () => {
        expect(getCardType("9999 0000")).toBe(CARD_TYPES.NONE);
    });

    it("should return CARD_TYPES.NONE if cardNumber is empty or invalid", () => {
        expect(getCardType("test")).toBe(CARD_TYPES.NONE);
        expect(getCardType("")).toBe(CARD_TYPES.NONE);
    });

    it("should return CARD_TYPES.MASTERCARD for MasterCard card number", () => {
        expect(getCardType("2720993901186354")).toBe(CARD_TYPES.MASTERCARD);
        expect(getCardType("5525757422093617")).toBe(CARD_TYPES.MASTERCARD);
        expect(getCardType("5498354457582848")).toBe(CARD_TYPES.MASTERCARD);
    });

    it("should return CARD_TYPES.VISA for Visa card number", () => {
        expect(getCardType("4929645527669651")).toBe(CARD_TYPES.VISA);
        expect(getCardType("4716953716782013")).toBe(CARD_TYPES.VISA);
        expect(getCardType("4539508627201998689")).toBe(CARD_TYPES.VISA);
    });
});

describe("isNumeric()", () => {
    it("should return true for string with only digits", () => {
        expect(isNumeric("12345")).toBe(true);
    });

    it("should return false for string with only letters", () => {
        expect(isNumeric("abcdf")).toBe(false);
    });

    it("should return false for string with digits and digits", () => {
        expect(isNumeric("1a2b3c4d")).toBe(false);
    });
});

describe("hasReachedMaximumLength()", () => {
    it("should return true if mastercard has 16 chars", () => {
        expect(hasReachedMaximumLength("2720993901186354")).toBe(true);
    });

    it("should return false if mastercard has less than 16 chars", () => {
        expect(hasReachedMaximumLength("27209939011863")).toBe(false);
    });

    it("should return true if mastercard has over 16 chars", () => {
        expect(hasReachedMaximumLength("27209939011863333")).toBe(true);
    });

    it("should return true if visa has 19 chars", () => {
        expect(hasReachedMaximumLength("4539508627201998689")).toBe(true);
    });

    it("should return false if visa has less than 16 chars", () => {
        expect(hasReachedMaximumLength("45395086272019986")).toBe(false);
    });

    it("should return true if visa has over 16 chars", () => {
        expect(hasReachedMaximumLength("45395086272019986899")).toBe(true);
    });
});

describe("formatCardNumber()", () => {
    it("should return format credit card number - xxxx xxxx xxxx xxxx", () => {
        expect(formatCardNumber("123456789000")).toBe("1234 5678 9000");
    });
});

describe("formatExpiryDate()", () => {
    it("should add 0 prefix for 1-9 month", () => {
        expect(formatExpiryDate("1/")).toEqual("01 / ");
    });

    it("should add space before and after '/' char", () => {
        expect(formatExpiryDate("11/22")).toEqual("11 / 22");
    });

    it("should return empty string if data is in bad format", () => {
        expect(formatExpiryDate("aaaa")).toEqual("");
    });

    it("should return empty string if data has two 0", () => {
        expect(formatExpiryDate("00")).toEqual("");
    });
});
