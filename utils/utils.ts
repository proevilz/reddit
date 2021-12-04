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

export const toolbarConfig = [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
]

export const slugify = (string: string) => {
    const a =
        'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b =
        'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export const limitText = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) + '...' : text
}
