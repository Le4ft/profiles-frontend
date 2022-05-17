import { Heading, Flex, Avatar, Box, Center, Text, Stack, Divider, Button, Link, Badge, Image, Icon, useColorModeValue, VStack, SimpleGrid } from '@chakra-ui/react';
import { FaDiscord, FaUserAlt, FaAt, FaInstagramSquare, FaInstagram, FaBan } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import css from '../../styles/Bio.css';
import { GoVerified } from 'react-icons/go';

export default function ShortenC({ Profile }) {
    const user = Profile;

    return (
        <div className={css.container}>
            <Head>
                <title>{user.username}'s Profile</title>
            </Head>

            <Center py={6}>
            <Box
            maxW={'520px'}
            w={'full'}
            bg={'gray.700'}
            boxShadow={'2xl'}
            borderRadius='20px'
            p={6}
            textAlign={'center'}>
          <Image 
          src="https://upload.hicoria.com/files/ybcqgMYG.png"
          maxW='50%'
          margin='0 auto'
          marginTop='-15px'
           />

           <Box
           bg='red.700'
           w='full'
           padding='10px'
           rounded='xl'
           >
            <Text mb={2}>
            <Flex
              w={16}
              h={16}
              padding="10px"
              textAlign="center"
              align={'center'}
              justify={'center'}
              color={'white'}
              rounded={'full'}
              bg={'red.600'}
              mb={3}
              position="relative"
              left="50%"
              transform="translate(-50%)"
              shadow="xl"
              >
              <FaBan size="xs" />
            </Flex>

            <Heading size="md" textTransform="uppercase" fontFamily="Josefin Sans" >Banned</Heading>
            We're sorry, but this profile is banned. <br />
            <b>Reason: </b>Reason
            </Text>
            <Link
            color="white"
            onClick={() => window.open('..', '_self')}
            _hover={{ color: 'gray.300', textDecoration: 'none' }}
            >Back to Landing Page</Link>
           </Box>

      </Box>
            </Center>

        </div>
    );
}
/* 
TODO:
    Visit Profile - redirect to .host/u/uid
    About Me - Max 350 chars
*/
