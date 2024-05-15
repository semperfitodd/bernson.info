import React, {useEffect} from 'react';
import axios from 'axios';

const LinkedInCallback = () => {
    useEffect(() => {
        const fetchAccessToken = async (authorizationCode) => {
            try {
                const response = await axios.post('https://your-api-gateway-url.amazonaws.com/dev/linkedin-token', {code: authorizationCode});
                const {accessToken} = response.data;
                localStorage.setItem('linkedin_access_token', accessToken);
                window.location.href = '/'; // Redirect to your home or articles page
            } catch (error) {
                console.error('Error fetching access token:', error.message);
                window.location.href = '/error'; // Redirect to an error page
            }
        };

        const params = new URLSearchParams(window.location.search);
        const authorizationCode = params.get('code');

        if (authorizationCode) {
            fetchAccessToken(authorizationCode);
        }
    }, []);

    return (
        <div>
            <h1>Processing LinkedIn OAuth Callback...</h1>
        </div>
    );
};

export default LinkedInCallback;
