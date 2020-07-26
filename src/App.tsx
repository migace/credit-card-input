import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Header } from "./components/Header";
import { CreditCardInput } from "./common/inputs/CreditCardInput";

const App: React.FC = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <Header>{t("app.title")}</Header>
            <Content>
                <CreditCardInput />
            </Content>
        </>
    );
};

const Content: React.FC = ({ children }) => (
    <ContentStyled>
        <h1>{children}</h1>
    </ContentStyled>
);

const ContentStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-bottom: 30px;
    color: #666;
    background: #fff;
    max-width: 800px;
    margin: 0 auto;
`;

export default App;
