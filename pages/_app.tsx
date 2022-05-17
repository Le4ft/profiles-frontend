import React, { useEffect, useState } from 'react';
import { User } from '../typings';
import { UserProvider } from '../components/user';
import API from '../api';
import { ChakraProvider } from "@chakra-ui/react"
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    const [user, setUser] = useState<User>(null);
    const router = useRouter();
    //const [version, setVersion] = React.useState('');

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const api = new API();
                const data = await api.refreshToken();
                //const { total, banned, disabled, unusedInvites, premium, version, files, pastes, statsStorageUsed, statsDomains, statsRegisteredToday, statsLoggedToday, statsUploadsToday } = await api.getStats();

                /*data.stats['total'] = total;
                data.stats['banned'] = banned;
                data.stats['disabled'] = disabled;
                data.stats['unusedInvites'] = unusedInvites;
                data.stats['premium'] = premium;
                data.stats['version'] = version;
                data.stats['statspastes'] = pastes;
                data.stats['statsStorageUsed'] = statsStorageUsed;
                data.stats['statsRegisteredToday'] = statsRegisteredToday;
                data.stats['statsLoggedToday'] = statsLoggedToday;
                data.stats['statsUploadsToday'] = statsUploadsToday;
                data.stats['statsDomains'] = statsDomains;
                data.stats['files'] = files;*/

                data.user['accessToken'] = data.accessToken;
                data.user['api'] = api;

                setUser(data.user);

                setTimeout(() => {
                    refreshToken();
                }, 780000);
            } catch (err) {
                //router.push('/');
                //console.log(err);
                if (router.pathname === '/dashboard') router.push('/');
            }
        };

        if (!user) refreshToken();
    }, []);


    return (
        <>
                <UserProvider value={{ user, setUser }}>
                    <ChakraProvider>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </UserProvider>
        </>
    );
}
