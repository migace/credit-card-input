import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

export const Header: React.FC = ({ children }) => {
    const { i18n } = useTranslation("common");

    return (
        <HeaderStyled>
            <LanguagesStyled>
                <ButtonStyled onClick={() => i18n.changeLanguage("pl")} active={i18n.language === "pl"}>
                    PL
                </ButtonStyled>
                <ButtonStyled onClick={() => i18n.changeLanguage("en")} active={i18n.language === "en"}>
                    EN
                </ButtonStyled>
            </LanguagesStyled>
            <h1>{children}</h1>
        </HeaderStyled>
    );
};

const HeaderStyled = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-bottom: 30px;
`;

const LanguagesStyled = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`;

const ButtonStyled = styled.button<{ active: boolean }>`
    width: 25px;
    height: 17px;
    border: 0;
    background-color: transparent;
    color: #fff;
    text-decoration: ${(props) => props.active && "underline"};

    &:focus {
        outline: 0;
    }
`;
