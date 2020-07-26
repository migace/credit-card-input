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

export const getCardType = (cardNmuber: string): CARD_TYPES => {
    const cardInfo = Object.values(CARD_DATA).find((card) => card.startPattern.test(cardNmuber));

    return cardInfo?.type || CARD_TYPES.NONE;
};

export const formatCardNumber = (cardNumber: string): string => {
    const matchedCardNumber = cardNumber.match(DEFAULT_CARD_FORMAT);

    return matchedCardNumber ? matchedCardNumber.join(" ") : cardNumber;
};
