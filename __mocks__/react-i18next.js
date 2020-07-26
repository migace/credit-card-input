const useMock = [(k) => k, {}];

useMock.t = (k) => k;
useMock.i18n = {};

module.exports = {
    useTranslation: () => useMock,
};
