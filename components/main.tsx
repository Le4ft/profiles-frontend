import { Heading, Avatar, Box, Center, FormControl, Textarea, Input, Text, Stack, Divider, Button, InputGroup, Link, Badge, Image, Icon, useColorModeValue, VStack, SimpleGrid, InputLeftElement } from '@chakra-ui/react';
import { FaDiscord, FaUserAlt, FaAt, FaInstagramSquare, FaInstagram, FaPlusSquare } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';
import { useRouter } from 'next/router';
import { useUser } from './user';
import React from 'react';
import css from '../styles/Bio.css';
import cssAPI from '../../styles/API.utils.css';

export default function ShortenC() {
    const { setUser, user } = useUser();
    const router = useRouter();

    const logout = async () => {
        try {
            await user.api.Logout();
            setUser(null);
            router.push('/');
        } catch (err) {
            router.push('/');
        }
    };

    const discordBtn = {
        marginRight: '5px',
        marginTop: '-10px',
        backgroundColor: '#7289DA',
        border: 'none',
    };

    return (

    <div className={css.container}>
    <Center py={6}>
    <Box
        maxW={'768px'}
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
          <Divider mb={3} />
        <SimpleGrid columns={2} spacing={5}>
          <Box>
          <Avatar
          size={'xl'}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          display={'block'}
          margin={'0 auto'}
        />
        <Input isRequired placeholder="Nickname (16 chars)" size="sm" w="70%" mt={3} mb={2} variant="filled" bg="gray.600" type="username"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />
        <Input isRequired placeholder="Title (e.g. Developer)" size="sm" w="70%" mb={2} variant="filled" bg="gray.600"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />
        <Input placeholder="Age" size="xs" w="70%" mb={4} variant="filled" bg="gray.600" type="age"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />
        <Input placeholder="Discord Username with Tag" size="xs" w="70%" mb={2} variant="filled" bg="gray.600"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />
        <Input placeholder="your@email.com" size="xs" w="70%" mb={2} variant="filled" bg="gray.600" type="email"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />
        <Input placeholder="Instagram (e.g. @instagram)" size="xs" w="70%" mb={2} variant="filled" bg="gray.600"
            style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
            _hover={{ bg: 'gray.700' }}
        />


<Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            borderRadius="10px"
            bg={'green.500'}
            color={'white'}
            _hover={{
              bg: 'green.400',
            }}
            boxShadow="lg"
            leftIcon={<FaPlusSquare />}
            _focus={{
              bg: 'green.400',
            }}>
            Create Bio
          </Button>
        </Stack>

            </Box>
            <Box>
            <Heading fontSize={'md'} fontFamily={'Inter'} textTransform="uppercase" color="gray.300" textAlign='left'>
          User Bio (max. 350 characters)
        </Heading>
        <Textarea isRequired placeholder="Here you can write your bio" maxH="376px" style={{ border: '1px solid #4A5568', borderRadius: '5px' }}
/>

            </Box>
        </SimpleGrid>

        <Button variant="link" color="gray.300" fontSize="0.8rem" mt={2} mb={0}>
            Need help? Click me
        </Button>

      </Box>
            </Center>
    </div>
    );
}
// TODO:

/*

Create Bio/Edit Bio button
Need help modal
Create/Edit button redirect to user bio


*/ 