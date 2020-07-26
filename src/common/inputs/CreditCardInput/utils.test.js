import { getCardType } from "./utils";
import { CARD_TYPES } from "./consts";

describe("getCardType()", () => {
    it("should return CARD_TYPES.NONE if cardNumber doesn't match to defined card types", () => {
        expect(getCardType("9999 0000")).toBe(CARD_TYPES.NONE);
    });

    it("should return CARD_TYPES.NONE if cardNumber is empty or invalid", () => {
        expect(getCardType("test")).toBe(CARD_TYPES.NONE);
        expect(getCardType(undefined)).toBe(CARD_TYPES.NONE);
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
