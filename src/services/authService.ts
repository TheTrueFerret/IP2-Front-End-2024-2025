import axios from 'axios'

export function addAccessTokenToAuthHeader(token: string | undefined) {
    //console.log('addAccessTokenToAuthHeader')
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        removeAccessTokenFromAuthHeader()
    }
}

export function removeAccessTokenFromAuthHeader() {
    delete axios.defaults.headers.common['Authorization']
}

export async function postingUser(id: string, username: string) {
    try {
        await axios.post('/api/gameuser/user', {
            id: id,
            username: username
        });
    } catch (error) {
        console.error('Failed to post user:', error);
        return []
    }
}

