import Axios, { Method } from 'axios';

export async function register(username: string, password: string, email: string, invite: string) {
    try {
        const { data } = await Axios.post(`${process.env.BACKEND_URL}/auth/register`, {
            username,
            password,
            email,
            invite,
        }, {
            withCredentials: true,
        });

        return data;
    } catch (err) {
        err = err.response.data.message;

        throw new APIError(
            //`${err.charAt(0).toUpperCase() + err.slice(1)}.`
            `${err}`
        );
    }
}

export async function sendPasswordReset(email: string) {
    try {
        const { data } = await Axios.post(`${process.env.BACKEND_URL}/auth/password_resets/send`, {
            email,
        }, {
            withCredentials: true,
        });

        return data;
    } catch (err) {
        err = err.response.data.error;

        throw new APIError(
            `${err.charAt(0).toUpperCase() + err.slice(1)}.`
        );
    }
}

export async function resetPassword(key: string, password: string, confirmPassword: string) {
    try {
        const { data } = await Axios.post(`${process.env.BACKEND_URL}/auth/password_resets/reset`, {
            key,
            password,
            confirmPassword,
        });

        return data;
    } catch (err) {
        err = err.response.data.error;

        throw new APIError(
            `${err.charAt(0).toUpperCase() + err.slice(1)}.`
        );
    }
}

export class APIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export default class API {

    accessToken: string;

    constructor() {
        this.accessToken;
    }

    async request({ endpoint, method, body, headers }: {
      endpoint: string;
      method: Method;
      body?: object;
      headers?: object;
    }) {
        try {
            const baseUrl = process.env.BACKEND_URL;

            const { data } = await Axios({
                url: `${baseUrl}${endpoint}`,
                method,
                data: body ? body: null,
                headers: {
                    ...headers,
                    'authorization': `qwe_50186c29-444f-4255-94f4-daa444192265`,
                    'x-access-token': `Bearer ${this.accessToken}`,
                },
                withCredentials: true,
            });

            return data;
        } catch (err) {
            err = err.response.data.message;

            throw new APIError(
                //`${err.charAt(0).toUpperCase() + err.slice(1)}.`
                `${err}`
            );
        }
    }

    // New Endpoints

    async GetStats() {
        const data = await this.request({
            endpoint: '/stats',
            method: 'GET',
        });

        return data;
    }

    async GetProfile(username: string) {
        const data = await this.request({
            endpoint: `/user/${username}`,
            method: 'GET',
        });

        return data;
    }

    async UpdateText(type: string, value: string) {
        const data = await this.request({
            endpoint: `/user/@me/settings/text`,
            method: 'PUT',
            body: {
                type,
                value,
            }
        });

        return data;
    }

    async UpdateProfile(title: string, age: string, bio: string) {
        const data = await this.request({
            endpoint: `/user/@me/settings/profile`,
            method: 'PUT',
            body: {
                title,
                age,
                bio,
            }
        });

        return data;
    }

    async UpdateSettings(data: any) {
        return await this.request({
            endpoint: '/user/@me/settings/',
            method: 'PUT',
            body: data,
        });
    }

    async Logout() {
        return await this.request({
            endpoint: '/auth/logout',
            method: 'POST',
        });
    }

    async Disable() {
        return await this.request({
            endpoint: '/user/@me/disable',
            method: 'POST',
        });
    }

    async Enable() {
        return await this.request({
            endpoint: '/user/@me/enable',
            method: 'POST',
        });
    }

    async GenerateInvite() {
        return await this.request({
            endpoint: '/invite/',
            method: 'POST',
        });
    }

    async DeleteInvite(id: string) {
        return await this.request({
            endpoint: `/invite/${id}`,
            method: 'DELETE',
        });
    }

    async getInvites() {
        const data = await this.request({
            endpoint: `/user/@me/invites`,
            method: 'GET',
        });

        return data.invites;
    }

    async getAdminInvites(idd: string) {
        const data = await this.request({
            endpoint: `/invite/user/invites`,
            method: 'GET',
            body: {
                id: idd
            },
        });

        return data.invites;
    }

    async Search(username: string) {
        return await this.request({
            endpoint: `/admin/user`,
            method: 'POST',
            body: {
                username
            },
        });
    }

    async Ban(id: string, reason: string) {
        return await this.request({
            endpoint: `/admin/ban`,
            method: 'POST',
            body: {
                id,
                reason
            },
        });
    }

    async Unban(id: string) {
        return await this.request({
            endpoint: `/admin/unban`,
            method: 'POST',
            body: {
                id,
            },
        });
    }

    async Verify(id: string) {
        return await this.request({
            endpoint: `/admin/verify`,
            method: 'POST',
            body: {
                id,
            },
        });
    }

    async Unverify(id: string) {
        return await this.request({
            endpoint: `/admin/verify`,
            method: 'POST',
            body: {
                id,
            },
        });
    }

    async AdminGenerateInvite(id: string) {
        return await this.request({
            endpoint: `/invite/user/`,
            method: 'POST',
            body: {
                id,
            },
        });
    }

    async RevokeSessions() {
        return await this.request({
            endpoint: `/auth/revoke_sessions`,
            method: 'POST',
        });
    }

    // Old Endpoints

    async refreshToken() {
        const data = await this.request({
            endpoint: '/auth/',
            method: 'POST',
        });

        this.accessToken = data.accessToken;

        return data;
    }

    async login(username: string, password: string) {
        const data = await this.request({
            endpoint: '/auth/login',
            method: 'POST',
            body: {
                username,
                password,
            },
        });

        this.accessToken = data.accessToken;

        return data;
    }

    async changeUsername(username: string, password: string) {
        return await this.request({
            endpoint: '/user/@me/change_username',
            method: 'PUT',
            body: {
                username,
                password,
            },
        });
    }

    async changePassword(newPassword: string, password: string) {
        return await this.request({
            endpoint: '/user/@me/change_password',
            method: 'PUT',
            body: {
                newPassword,
                password,
            },
        });
    }

    async getUser(uuid: string) {
        return await this.request({
            endpoint: `/user/user/${uuid}`,
            method: 'GET',
        });
    }
};

export async function GetStats() {
    const { data } = await Axios.get(`${process.env.BACKEND_URL}/stats`);

    return data;
}