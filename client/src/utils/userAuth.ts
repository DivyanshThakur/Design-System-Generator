interface IData {
    userId: string;
    accessToken?: string | null;
    expiresAt: number;
}

export const saveUserAuth = (data: IData) => {
    localStorage.setItem(`dsg-userAuth`, JSON.stringify(data));
};

export const removeUserAuth = () => {
    localStorage.removeItem(`dsg-userAuth`);
};

export const getUserAuth = () => {
    let data = localStorage.getItem(`dsg-userAuth`);

    const getInitialState = (): IData => ({
        userId: '',
        accessToken: null,
        expiresAt: Date.now(),
    });

    if (!data) return getInitialState();

    let decodedData = JSON.parse(data) as IData;

    return decodedData.expiresAt > Date.now() ? decodedData : getInitialState();
};
