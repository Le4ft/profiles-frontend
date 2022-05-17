import {  Box,  Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';
import styles from '../styles/API.utils.css';

export default function StatsCard(props: any) {
    const { title, stat, icon } = props;

    return (
        <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        w="250px"
        bg={'gray.900'}
        color={'white'}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated color={'gray.400'} className={styles.wsans}>
                {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'} color={'white'}>
                {stat}
            </StatNumber>
            </Box>
            <Box
            my={'auto'}
            color={'white'}
            alignContent={'center'}>
            {icon}
            </Box>
        </Flex>
        </Stat>
    );
}