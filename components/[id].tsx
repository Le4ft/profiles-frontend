import { Heading, IconButton, Avatar, Box, Center, ButtonGroup, Text, Stack, Divider, Button, Link, Badge, Image, Icon, useColorModeValue, VStack, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { FaDiscord, FaUserAlt, FaAt, FaInstagramSquare, FaInstagram, FaTwitter, FaGithub, FaSteam, FaThumbsUp, FaEye, FaThumbsDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';;
import { GoVerified } from 'react-icons/go';
import { AdminBadge, DeveloperBadge, PremiumBadge } from '../utils/Badges';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useUser } from './user';
import { NextSeo } from "next-seo";
import { createStandaloneToast } from "@chakra-ui/react"
import Head from 'next/head';
import React from 'react';
import css from '../styles/Bio.css'

export default function ShortenC({ Profile }) {
    const router = useRouter();
    let { user, setUser } = useUser();
    const profile = Profile;

    const toast = createStandaloneToast()
    const Noti = (title: string, desc: string, state: any) => {
      toast({
          title: title,
          description: desc,
          status: state,
          duration: 2500,
          isClosable: true,
          position: "top",
      });
    };    

    return (
      <>
        <div className={css.container}>
            <Head>
                <title>{profile.username}'s Bio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="og:title" content="test"/>
                <meta name="og:description" content="loady.host is a simple and powerful file hosting platform, with great support, competent developers, and a welcoming community."/>
                <meta name="theme-color" content="#e6394a" />
            </Head>

            <Center py={6}>
            <Box
        maxW={'768px'}
        boxShadow="6px 7px 19px 0px rgba(66,153,225,0.75), -5px -6px 19px 0px rgba(159,122,234,0.75)"
        w={'full'}
        bg={'gray.800'}
        borderRadius='20px'
        p={6}
        textAlign={'center'}>
          <Link href="..">
          <Image 
          src="https://upload.hicoria.com/files/ybcqgMYG.png"
          maxW='50%'
          margin='0 auto'
          marginTop='-15px'
           />
          </Link>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} style={{  }}>
          <Box>
          <Avatar
          size={'xl'}
          src={
            `${profile.discord && profile.discord.avatar ? profile.discord.avatar : null}`
          }
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading mt={2} fontSize={'2xl'} color="white" fontFamily="Inter">
          {profile.username}{profile.badges && profile.verified ? <Tooltip label="This user is Verified" aria-label="Verified tooltip"><Icon ml={2} w={4} h={4} color="#59acff"><GoVerified /></Icon></Tooltip> : null}
        </Heading>
        <Text
          color={'gray.200'}
          textAlign={'center'}
          fontSize='1.1rem'
          mb={2}
        >
          {profile.title ? profile.title : ''}
        </Text>
        {profile.age && profile.age.text ? <Text
          color={'gray.200'}
          textAlign={'center'}
          fontSize='0.9rem'
          lineHeight="5px"
          mb={3}
        >
          {profile.age.text ? `${profile.age.text} years` : null}
        </Text> : null}
        <Stack direction="row" justifyContent="center" spacing={1} mb={2}>
        {profile.badges && profile.ranks ? profile.ranks.admin ? AdminBadge : null : null}
        {profile.badges && profile.ranks ? profile.ranks.developer ? DeveloperBadge : null : null}
        {profile.badges && profile.premium ? profile.premium.active ? PremiumBadge : null : null}
      </Stack>
        {profile.discord ? <Button variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaDiscord />}
            _hover={{ color: 'lightblue', }}
        >{profile.discord.linked ? `${profile.discord.username}#${profile.discord.discriminator}` : `Not Linked`}</Button> : null}
        {profile.contactEmail && profile.contactEmail.text ? <Button onClick={() => {
          navigator.clipboard.writeText(profile.contactEmail.text);

          Noti("Copied Email to your Clipboard", "Copied Invite URL to clipboard", "success");
        }} variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaAt />}
            _hover={{ color: 'orange', }}
        >{profile.contactEmail.text ? `${profile.contactEmail.text}` : null}</Button> : null}

        {!profile.icons && profile.instagram && profile.instagram.text ? <Button variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaInstagram />} onClick={() => window.open(`https://www.instagram.com/${profile.instagram.text}/`, '_blank')} _hover={{ color: 'orange', }}>{!profile.icons && profile.instagram.text ? `@${profile.instagram.text}` : null}</Button> : null}
        {!profile.icons && profile.twitter && profile.twitter.text ? <Button variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaTwitter />} onClick={() => window.open(`https://twitter.com/${profile.twitter.text}/`, '_blank')} _hover={{ color: 'lightblue', }}>{profile.twitter.text ? `@${profile.twitter.text}` : null}</Button> : null}
        {!profile.icons && profile.github && profile.github.text ? <Button variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaGithub />} onClick={() => window.open(`https://github.com/${profile.github.text}/`, '_blank')} _hover={{ color: '#9232e6', }}>{profile.github.text ? `@${profile.github.text}` : null}</Button> : null}
        {!profile.icons && profile.steam && profile.steam.name? <Button variant="link" size="xs" colorScheme="gray" w="100%" leftIcon={<FaSteam />} onClick={() => window.open(`https://steamcommunity.com/id/${profile.steam.text}/`, '_blank')} _hover={{ color: '#171923', }}>{profile.steam.name ? `@${profile.steam.name}` : null}</Button> : null}
        
        {profile.icons && profile.instagram ? <IconButton mt={2} margin={1} aria-label="Instagram" bg="transparent" size="xs" icon={<FaInstagram size="xs" />} 
        _hover={{ bg: 'transparent', color: '#ED8936' }}
        /> : null}
        {profile.icons && profile.twitter ? <IconButton mt={2} margin={1} aria-label="Twitter" bg="transparent" size="xs" icon={<FaTwitter size="xs" />} 
        _hover={{ bg: 'transparent', color: '#63B3ED' }}
        /> : null}
        {profile.icons && profile.github ? <IconButton mt={2} margin={1} aria-label="Github" bg="transparent" size="xs" icon={<FaGithub size="xs" />} 
        _hover={{ bg: 'transparent', color: '#9232e6' }}
        /> : null}
        {profile.icons && profile.steam ? <IconButton mt={2} margin={1} aria-label="Steam" bg="transparent" size="xs" icon={<FaSteam size="xs" />} 
        _hover={{ bg: 'transparent', color: '#171923' }}
        /> : null}

        {profile.views ? 
          <SimpleGrid columns={4} spacing={10} pl={3} pr={3} mt={2}>
            <Text><Icon as={FaEye} w={4} h={4} mr={1} />{profile.views ? profile.views : 'N/A'}</Text>
            <Text><Icon as={FaThumbsUp} color="lightgreen" w={4} h={4} mr={1} />{profile.likes ? profile.likes : 'N/A'}</Text>
            <Text><Icon as={FaThumbsDown} color="red.400" w={4} h={4} mr={1} />{profile.dislikes ? profile.dislikes : 'N/A'}</Text>
            {user ? <ButtonGroup size="sm" isAttached>
            <IconButton 
            aria-label="Like Profile" 
            icon={<FaThumbsUp />}
            color="white"
            bg="green.400"
            _hover={{ color: 'white', bg: 'green.500' }}
            size="xs"
            w="10%"
            />       
            <IconButton 
            aria-label="Dislike Profile" 
            icon={<FaThumbsDown />} 
            color="white"
            bg="red.400"
            _hover={{ color: 'white', bg: 'red.500' }}
            size="xs"
            w="10%"
            />  
            </ButtonGroup> : null}
          </SimpleGrid>  
        : null}

            </Box>
            <Box>
            <Heading fontSize={'md'} fontFamily={'Inter'} textTransform="uppercase" color="gray.300" textAlign='left'>
          User Bio
        </Heading>
        <Text
          textAlign={'left'}
          color={'gray.200'}
          whiteSpace='pre-wrap'
          overflow="auto"
        >
          {profile.bio}
        </Text>

            </Box>
        </SimpleGrid>

      </Box>
            </Center>

        </div>
        </>
    );
}
/* 
TODO:
    Visit Profile - redirect to .host/u/uid
    About Me - Max 256 chars



    LIKE/DISLIKE - KDYZ NEKDO DA LIKE NEBO DISLIKE TAK TO ZMENI BARVU BUD NA GREEN.700 NEBO NA RED.700
*/