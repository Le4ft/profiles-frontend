import React, { useEffect, useState } from 'react';
import { HomeOutlined, QuestionOutlined } from '@ant-design/icons';
import API from '../api/index';
import { useRouter } from 'next/router';
import { useUser } from '../components/user';
//import Verify from '../components/noaccess';
import ProfileC from '../components/[id]';
import BannedC from '../components/banned/profile';
import DisabledC from '../components/disabled';
import css from '../styles/Bio.css';
import styles from '../styles/Home.module.css';
import Link from 'next/link';


export default function ProfileID() {
    const api = new API();
    const router = useRouter();
    //const { user } = useUser();
    const { id } = router.query;

    //const [userProfile, setUserProfile] = useState(null);
    const [Profile, setProfile] = useState(null);

    const getProfile = async () => {
        try {
            const data = await api.GetProfile(id as string);

            //if (!data.user) return router.push('/');

            setProfile(data.user);
        } catch (err) {
            router.push('/');
        }
    };

    useEffect(() => {
        if (router.asPath !== router.route) getProfile();
    }, [router]);

    //if (!userProfile || !Profile) return null;
    if (!Profile) return (<div className={css.container}></div>)
    //if (!Profile) return null;
    // TODO - 404 Not Found like pays.host


    // if (!userProfile.discord.linked) return <Verify />;

    //return <ProfileC userProfile={userProfile} Profile={Profile} />;
    return Profile.banned && Profile.banned.active ? <BannedC Profile={Profile} /> : Profile.disabled ? <DisabledC Profile={Profile} /> : <ProfileC Profile={Profile} />;
}