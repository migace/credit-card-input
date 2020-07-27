import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from "react";
import payment from "payment";

import { CreditCardNumber } from "./CreditCardNumber";
import { CreditCardExpiryDate } from "./CreditCardExpiryDate";
import { CreditCardCVC } from "./CreditCardCVC";
import { MessagesStyled, WrapperStyled } from "./styles";
import {
    formatCardNumber,
    formatExpiryDate,
    getCardType,
    hasReachedMaximumLength,
    hasCVCReachedMaxLength,
    hasExpiryDateReachedMaxLength,
    isNumeric,
    validateExpiryDate,
} from "./utils";
import { CARD_TYPES, DEFAULT_EXPIRY_DATE_LENGTH } from "./consts";

export const CreditCardInput: React.FC = () => {
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardExpiryDate, setCreditCardExpiryDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [message, setMessage] = useState("");
    const [cardType, setCardType] = useState(CARD_TYPES.NONE);
    const creditCardExpiryDateRef = useRef<HTMLInputElement>(null);
    const creditCardCVCRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (creditCardExpiryDate.split(" / ").join("/").length === DEFAULT_EXPIRY_DATE_LENGTH) {
            setMessage(validateExpiryDate(creditCardExpiryDate.split(" / ").join("/")));
        }

        if (
            hasReachedMaximumLength(creditCardNumber.split(" ").join("")) &&
            payment.fns.validateCardNumber(creditCardNumber) &&
            creditCardExpiryDateRef.current
        ) {
            creditCardExpiryDateRef.current.focus();
        } else if (hasReachedMaximumLength(creditCardNumber.split(" ").join(""))) {
            setMessage("Credit card number is invalid");
        } else {
            setMessage("");
        }

        if (validateExpiryDate(creditCardExpiryDate.split(" / ").join("/")) === "" && creditCardCVCRef.current) {
            creditCardCVCRef.current.focus();
        }
    }, [creditCardNumber, creditCardExpiryDate]);

    const creditCardNumberOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        const formattedCardNumber = formatCardNumber(value);

        setCardType(getCardType(value));
        setCreditCardNumber(formattedCardNumber);
    };

    const creditCardNumberKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasReachedMaximumLength(creditCardNumber.split(" ").join(""))) && e.preventDefault();

    const creditCardExpiryDateOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
        setCreditCardExpiryDate(formatExpiryDate(value));

    const creditCardExpiryDateKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        hasExpiryDateReachedMaxLength(creditCardExpiryDate) && e.preventDefault();

    const creditCardCVCOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
        setCreditCardCVC(value);

    const creditCardCVCKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasCVCReachedMaxLength(creditCardCVC)) && e.preventDefault();

    return (
        <>
            <WrapperStyled>
                <CreditCardNumber
                    cardType={cardType}
                    value={creditCardNumber}
                    onChange={creditCardNumberOnChangeHandler}
                    onKeyPress={creditCardNumberKeyPressHandler}
                />
                <CreditCardExpiryDate
                    ref={creditCardExpiryDateRef}
                    value={creditCardExpiryDate}
                    onChange={creditCardExpiryDateOnChangeHandler}
                    onKeyPress={creditCardExpiryDateKeyPressHandler}
                />
                <CreditCardCVC
                    ref={creditCardCVCRef}
                    value={creditCardCVC}
                    onChange={creditCardCVCOnChangeHandler}
                    onKeyPress={creditCardCVCKeyPressHandler}
                />
            </WrapperStyled>
            <MessagesStyled>{message}</MessagesStyled>
        </>
    );
};
