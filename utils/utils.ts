import axios from 'axios'

export const requestGithubEmail = async (accessToken: string) => {
    if (!accessToken) {
        throw new Error('Access token is required')
    }
    try {
        const { data } = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        })
        const email = data.find((email: any) => email.primary)
        return email.email
    } catch (error) {
        console.error('Failed to get user email address', error)
    }
}
