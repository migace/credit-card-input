import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { CreditCardNumber } from "./CreditCardNumber";
import { CARD_TYPES } from "./consts";

describe("<CreditCardNumber />", () => {
    const setup = () => {
        const onChange = jest.fn();
        const onKeyPress = jest.fn();
        const value = "4567";
        const props = {
            onChange,
            onKeyPress,
            value,
            cardType: CARD_TYPES.VISA,
        };

        const utils = render(<CreditCardNumber {...props} />);

        return {
            ...utils,
            onChange,
            onKeyPress,
            value,
        };
    };

    it("should call onChange function passed by props if change event has been fire", () => {
        const { getByTestId, onChange } = setup();
        const inputElement = getByTestId("credit-card-number");

        fireEvent.change(inputElement, { target: { value: "110000000" } });

        expect(onChange).toHaveBeenCalled();
    });

    it("should call onKeyPress function passed by props if keyPress event has been fire", () => {
        const { getByTestId, onKeyPress } = setup();
        const inputElement = getByTestId("credit-card-number");

        fireEvent.keyPress(inputElement, { key: "A", code: "KeyA", charCode: 65 });

        expect(onKeyPress).toHaveBeenCalled();
    });
});
