import { Heading, Avatar, Box, Center, Text, Stack, Divider, Button, Link, Badge, Image, Icon, useColorModeValue, VStack, SimpleGrid, Flex, IconButton, HStack, useDisclosure } from '@chakra-ui/react';
import { FaDiscord, FaUserAlt, FaAt, FaInstagramSquare, FaInstagram } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import css from '../../styles/Bio.css';
import { GoVerified } from 'react-icons/go';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { BiTrashAlt } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { GiSightDisabled } from 'react-icons/gi';
import { useUser } from '../user';

export default function ShortenC({}) {
    let { user, setUser } = useUser();
    
     const { isOpen : isOpenMobile, onOpen : onOpenMobile, onClose : onCloseMobile } = useDisclosure();

    return (
      <div className={css.container}>

      <Box p={4} bg="gray.700" rounded="2xl" padding="25px">
      <Box bg={'gray.600'} px={4} rounded="xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpenMobile ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpenMobile ? onCloseMobile : onOpenMobile}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Avatar
              w="40px"
              h="40px"
              />
              <Text fontSize="lg">{user.username}</Text>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
              <Button
                colorScheme="red"
                variant="outline"
                border="2px solid #C53030"
                _hover={{ bg: 'red.600', color: 'white', border: '2px solid #C53030' }}
              >
                  Logout
              </Button>
          </Flex>
        </Flex>

      </Box>
        <Center>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Image
      src="https://upload.hicoria.com/files/jtzfNcXZ.png"
      maxW="40%"
      margin="0 auto"
      />
      <Box
        maxW="1024px"
        w={'full'}
        bg={'red.700'}
        shadow="xl"
        color="white"
        mt={8}
        padding="10px"
        rounded="lg"
        display="flex"
        position="relative"
      >
            <Stack
            direction="column"
            spacing={3}
            >
            <Heading size="md" textTransform="uppercase" fontFamily="Josefin Sans" >Banned</Heading>
            <Text>You can't access profiles dashboard because you are banned! Your profile card was deleted and your page is hidden to everyone.</Text>
            <Text><b>Ban Details:</b><br />
            Banned by: Qwesdy <br />
            Reason: N/A <br />
            Expire: <Badge colorScheme="red" >Never</Badge> <Badge colorScheme="yellow" >01/09/2021</Badge>
            </Text>
            </Stack>

      </Box>
    </Box>

          </Center>

      </Box>

        </div>

    );
}
/* 
TODO:
    Visit Profile - redirect to .host/u/uid
    About Me - Max 350 chars
*/