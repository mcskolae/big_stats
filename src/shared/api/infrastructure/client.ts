abstract class Client {
    protected async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    }
}

export default Client;
