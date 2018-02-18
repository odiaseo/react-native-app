
const tokenHelper = {
    getAccessToken() {
        return fetch(
            'https://api.kuponhub.net/api/v1/oauth/token',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        'client_id': 3,
                        'client_secret': 'Q3IpUgZ6UjO2GTeCkaiRRzKhqMo8bJfhKyR0IGK0',
                        'grant_type': 'client_credentials'
                    }
                )
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                return responseJson.access_token;
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

export default tokenHelper;