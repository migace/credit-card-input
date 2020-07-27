import { KeyboardEvent } from "react";

import { CARD_TYPES, DEFAULT_CARD_FORMAT } from "./consts";

interface ICardData {
    type: CARD_TYPES;
    startPattern: RegExp;
    maxCardNumberLength: number;
}

export const CARD_DATA: ICardData[] = [
    {
        type: CARD_TYPES.MASTERCARD,
        startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
        maxCardNumberLength: 16,
    },
    {
        type: CARD_TYPES.VISA,
        startPattern: /^4/,
        maxCardNumberLength: 19,
    },
];

const getCardData = (cardNumber: string): ICardData | undefined =>
    Object.values(CARD_DATA).find((card) => card.startPattern.test(cardNumber));

export const getCardType = (cardNumber: string): CARD_TYPES => {
    const cardInfo = getCardData(cardNumber);

    return cardInfo?.type || CARD_TYPES.NONE;
};

export const hasReachedMaximumLength = (cardNumber: string): boolean => {
    const maxCardNumberLength = getCardData(cardNumber)?.maxCardNumberLength;

    return maxCardNumberLength ? cardNumber.length >= maxCardNumberLength : false;
};

export const formatCardNumber = (cardNumber: string): string => {
    const matchedCardNumber = cardNumber.match(DEFAULT_CARD_FORMAT);

    return matchedCardNumber ? matchedCardNumber.join(" ") : cardNumber;
};

export const formatExpiryDate = (expiryDate: string): string => {
    const normalizedExpiryDate = expiryDate.split(" / ").join("/");

    if (!normalizedExpiryDate) {
        return "";
    }

    let copyNormalizedExpiryDate = normalizedExpiryDate;
    if (/^[2-9]$/.test(normalizedExpiryDate)) {
        copyNormalizedExpiryDate = `0${copyNormalizedExpiryDate}`;
    }

    if (normalizedExpiryDate.length === 2 && +normalizedExpiryDate > 12) {
        const [head, ...tail] = normalizedExpiryDate;
        copyNormalizedExpiryDate = `0${head}/${tail.join("")}`;
    }

    if (/^1[/-]$/.test(copyNormalizedExpiryDate)) {
        return `01 / `;
    }

    if (/^00$/.test(copyNormalizedExpiryDate)) {
        return "";
    }

    const macthedExpiryDate = copyNormalizedExpiryDate.match(/(\d{1,2})/g) || [];
    console.log("dwdwdw", macthedExpiryDate);
    debugger;
    if (macthedExpiryDate.length === 1) {
        if (normalizedExpiryDate.includes("/")) {
            return macthedExpiryDate[0];
        }

        if (/\d{2}/.test(copyNormalizedExpiryDate)) {
            return `${macthedExpiryDate[0]} / `;
        }
    }
    if (macthedExpiryDate.length > 2) {
        const [, month, year] = macthedExpiryDate.join("").match(/^(\d{2}).*(\d{2})$/) || [];
        return [month, year].join(" / ");
    }

    return macthedExpiryDate.join(" / ");
};

export const isNumeric = (value: string): boolean => /^\d*$/.test(value);
