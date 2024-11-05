interface FetchResponse<T> {
    ok: boolean;
    status: number;
    json(): Promise<T>;
}

const requestWrapper = async <T>(cal: () => Promise<FetchResponse<T>>): Promise<T> => {
    try {
        const res = await cal();

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error(`Ошибка ${res.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default requestWrapper;
