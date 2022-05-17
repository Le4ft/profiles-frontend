import React, { useEffect } from 'react';
import { useUser } from '../components/user';
import { useRouter } from 'next/router';
//import Verify from '../../components/noaccess';
import ShortenC from '../components/dashboard';
import BannedC from '../components/banned/dashboard';
import css from '../styles/Bio.css';

export default function Shorten() {
    const router = useRouter();
    const { user } = useUser();

    //if (!user) return null;

    useEffect(() => {
        if (router.asPath !== router.route) {
            if (!user) {
                router.push('/');
            }
        }
    }, [router, user]);

    if (!user) return null;

    if (!user) {
        router.push('/');
    }

    if (!user) return (<div className={css.container}></div>);

    //return user.beta ? <ShortenC /> : <Verify />;
    return user.banned.active ? <BannedC /> : <ShortenC />;
}