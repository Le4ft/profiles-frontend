import React, { useEffect } from 'react';
import { useUser } from '../components/user';
import { useRouter } from 'next/router';
//import Verify from '../components/noaccess';
import ShortenC from '../components/landing';

export default function Shorten() {
    /*const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, []);

    if (!user) return null;*/

    //return user.beta ? <ShortenC /> : <Verify />;
    return <ShortenC />;
}