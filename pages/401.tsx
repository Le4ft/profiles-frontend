import { Heading, Avatar, Box, Center, Text, Stack, Divider, Button, Link, Badge, Flex, Image, Icon, useColorModeValue, VStack, SimpleGrid } from '@chakra-ui/react';
import { FaDiscord, FaUserAlt, FaAt, FaInstagramSquare, FaInstagram, FaEyeSlash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaBan } from 'react-icons/fa';
import Head from 'next/head';
import React from 'react';
import css from '../styles/Bio.css';
import { GoVerified } from 'react-icons/go';
import { useUser } from '../components/user';


export default function Custom404() {
    const { user } = useUser();

    return (
        <div className={css.container}>
      <Head>
          <title>404 Not Found</title>
      </Head>

      <Center py={6}>
      <Box
      maxW={'520px'}
      w={'full'}
      bg={'gray.800'}
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
        <FaEyeSlash size="xs" />
      </Flex>

      <Heading size="md" textTransform="uppercase" fontFamily="Josefin Sans">Unauthorized</Heading>
      We're sorry, but you don't have access to this page.</Text>
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
