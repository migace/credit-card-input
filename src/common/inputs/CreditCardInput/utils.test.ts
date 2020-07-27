import {
    formatCardNumber,
    formatExpiryDate,
    getCardType,
    hasReachedMaximumLength,
    isNumeric,
    validateExpiryDate,
    hasExpiryDateReachedMaxLength,
} from "./utils";
import { CARD_TYPES, INVALID_EXPIRY_DATE, MONTH_OUT_OF_RANGE, YEAR_OUT_OF_RANGE, DATE_OUT_OF_RANGE } from "./consts";

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

describe("validateExpiryDate()", () => {
    it("should return 'Expiry date is invalid' if date is not correct format - xx/xx", () => {
        expect(validateExpiryDate("12 / 12")).toEqual(INVALID_EXPIRY_DATE);
    });

    it("should return 'Expiry month must be between 01 and 12' if month is less than 01 or greater than 12", () => {
        expect(validateExpiryDate("00/22")).toEqual(MONTH_OUT_OF_RANGE);
        expect(validateExpiryDate("13/22")).toEqual(MONTH_OUT_OF_RANGE);
    });

    it("should return 'Expiry year cannot be in the past' if year is in the past", () => {
        const pastYear = (new Date().getFullYear() - 2).toString().slice(-2);

        expect(validateExpiryDate(`01/${pastYear}`)).toEqual(YEAR_OUT_OF_RANGE);
    });

    it("should return 'Expiry date cannot be in the past' if date is in the past", () => {
        const currentYear = new Date().getFullYear().toString().slice(-2);
        const pastMonth = ("0" + new Date().getMonth()).slice(-2);

        expect(validateExpiryDate(`${pastMonth}/${currentYear}`)).toEqual(DATE_OUT_OF_RANGE);
    });

    it("should return empty string if date is valid", () => {
        const currentYear = new Date().getFullYear().toString().slice(-2);
        const currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);

        expect(validateExpiryDate(`${currentMonth}/${currentYear}`)).toEqual("");
    });
});

describe("hasExpiryDateReachedMaxLength()", () => {
    it("should return false if expiry date has less than maximum length", () => {
        expect(hasExpiryDateReachedMaxLength("01/2")).toEqual(false);
    });

    it("should return true if expiry date has greater or equal maximum length", () => {
        expect(hasExpiryDateReachedMaxLength("01 / 22")).toEqual(true);
        expect(hasExpiryDateReachedMaxLength("01/22")).toEqual(true);
    });
});
