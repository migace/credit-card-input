import React, { ChangeEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import { CreditCardInputStyled } from "./styles";

type CreditCardExpiryDateProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
};

export const CreditCardExpiryDate = React.forwardRef<HTMLInputElement, CreditCardExpiryDateProps>(
    ({ onChange, value }, ref) => {
        const { t } = useTranslation("common");

        return (
            <CreditCardInputStyled
                ref={ref}
                placeholder={t("app.expiryDatePlaceholder")}
                onChange={onChange}
                value={value}
            />
        );
    },
);
