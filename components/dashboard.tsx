import { Switch, Textarea, Input, InputGroup, InputLeftElement, Tooltip, Heading, Avatar, Box, Center, Text, Flex, Stack, Button, Link, Badge, Image, SimpleGrid, Stat, StatLabel, StatNumber, Icon } from '@chakra-ui/react';
import { FaDiscord, FaAt, FaInstagram, FaTwitter, FaGithub, FaBirthdayCake, FaIdCardAlt, FaWrench, FaSteam, FaEnvelopeOpen, FaTimes, FaCopy, FaTimesCircle, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from "@chakra-ui/react"
import { GiSightDisabled } from 'react-icons/gi';
import { FaRegSave } from 'react-icons/fa';
import { FiUserPlus, FiLink, FiEdit2} from 'react-icons/fi';
import { AiOutlineFileAdd, AiFillEye } from 'react-icons/ai';
import { ReactNode } from 'react';
import { useUser } from './user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import css from '../styles/Bio.css';
import { IconButton, HStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AdminBadge, DeveloperBadge, PremiumBadge } from '../utils/Badges';
import { createStandaloneToast } from "@chakra-ui/react"
import { APIError, GetStats } from '../api';
import { Invite } from '../typings/index';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import StatsCard from '../utils/StatsCard';

export default function ShortenC({}) {
    const router = useRouter();
    let { user, setUser } = useUser();

    const { isOpen : isOpenMobile, onOpen : onOpenMobile, onClose : onCloseMobile } = useDisclosure();
    const { isOpen : isOpenEmail, onOpen : onOpenEmail, onClose : onCloseEmail } = useDisclosure();
    const { isOpen : isOpenIg, onOpen : onOpenIg, onClose : onCloseIg } = useDisclosure();
    const { isOpen : isOpenTwitter, onOpen : onOpenTwitter, onClose : onCloUpdateSettingswitter } = useDisclosure();
    const { isOpen : isOpenGithub, onOpen : onOpenGithub, onClose : onCloseGithub } = useDisclosure();
    const { isOpen : isOpenSteam, onOpen : onOpenSteam, onClose : onCloseSteam } = useDisclosure();
    const { isOpen : isOpenBio, onOpen : onOpenBio, onClose : onCloseBio } = useDisclosure();
    const { isOpen : isOpenInvite, onOpen : onOpenInvite, onClose : onCloseInvite } = useDisclosure();

    const [LogoutLoading, setLogoutLoading] = React.useState(false);
    const [EnterAdminLoading, setEnterAdminLoading] = React.useState(false);
    const [BioLoading, setBioLoading] = React.useState(false);
    const [DisableLoading, setDisableLoading] = React.useState(false);
    const [GenerateLoading, setGenerateLoading] = React.useState(false);
    const [DeleteInviteLoading, setDeleteInviteLoading] = React.useState(false);
    const [invites, setInvites] = React.useState<Invite[]>([]);

    const initialState = {
      contactEmail: user.contactEmail.text,
      instagram: user.instagram.text,
      twitter: user.twitter.text,
      github: user.github.text,
      steam: user.steam.text,
      age: user.age.text,
      title: user.title,
      bio: user.bio,
    };

    const [{
      contactEmail,
      instagram,
      twitter,
      github,
      steam,
      age,
      title,
      bio,
    }, setState] = useState(initialState);

    useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, []);

    const [stats, setStats] = React.useState(null);

    useEffect(() => {
      const fetchStats = () => {
        GetStats()
          .then(stats => {
            setStats(stats);
          })
          .catch(err => {
            setStats(null);
          });
      };
      fetchStats();
      const interval = setInterval(fetchStats, 10000);
      clearInterval(interval);
    }, []);

    useEffect(() => {
      user.api.getInvites()
        .then(invites => {
          setInvites(invites);
        })
        .catch(err => {
          setInvites(null);
        });
  
      return;
    }, []);
    
    const setInput = (property: string, val: string) => {
      setState((state) => ({
          ...state, [property]: val,
      }));
    };

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

    const CloseBio = () => {
      setInput('title', user.title);
      setInput('age', user.age.text);
      setInput('bio', user.bio);
      onCloseBio();
    }

    const CloseEmail = () => {
      setInput('contactEmail', user.contactEmail.text);
      onCloseEmail();
    }

    const CloseIg = () => {
      setInput('instagram', user.instagram.text);
      onCloseIg();
    }

    const CloUpdateSettingswitter = () => {
      setInput('twitter', user.twitter.text);
      onCloUpdateSettingswitter();
    }

    const CloseGithub = () => {
      setInput('github', user.github.text);
      onCloseGithub();
    }

    const CloseSteam = () => {
      setInput('steam', user.steam.text);
      onCloseSteam();
    }

    const getInvites = () => {
      user.api.getInvites()
      .then(invites => {
        setInvites(invites);
      })
      .catch(err => {
        setInvites(null);
      });

      return;
    }

    const Logout = async () => {
      setLogoutLoading(true);

      try {
          const data = await user.api.Logout();

          if (data.success && !data.error) {
            setUser(null);

            router.push('/').then(() => Noti("Successfully logged out", "", "success"));
          }
      } catch (err) {
          setLogoutLoading(false);
          router.push('/');

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };
 
    const Disable = async () => {
      setDisableLoading(true);

      try {
          const data = await user.api.Disable();

          if (data.success && !data.error) {
            user = Object.assign({}, user); 

            user.disabled = true;

            setUser(user);

            Noti("Successfully disabled your Profile", "", "success");

            setDisableLoading(false);
          }
      } catch (err) {
          setDisableLoading(false);

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };

    const Enable = async () => {
      setDisableLoading(true);

      try {
          const data = await user.api.Enable();

          if (data.success && !data.error) {
            user = Object.assign({}, user);

            user.disabled = false;

            setUser(user);

            Noti("Successfully enabled your Profile", "", "success");

            setDisableLoading(false);
          }
      } catch (err) {
          setDisableLoading(false);

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };

    const GenerateInvite = async () => {
      setGenerateLoading(true);

      try {
          const data = await user.api.GenerateInvite();

          await getInvites();

          if (data.success && !data.error) {
            navigator.clipboard.writeText(data.url);

            Noti("Successfully generated Invite", "Copied Invite URL to clipboard", "success");

            setGenerateLoading(false);
          }
      } catch (err) {
          setGenerateLoading(false);

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };

    const RevokeSessions = async () => {
      setGenerateLoading(true);

      try {
          const data = await user.api.RevokeSessions();

          if (data.success && !data.error) {
            setUser(null);

            router.push('/').then(() => Noti("Successfully Revoked all Sessions", "", "success"));

            setGenerateLoading(false);
          }
      } catch (err) {
          setGenerateLoading(false);

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };

    const DeleteInvite = async (id: string) => {
      setDeleteInviteLoading(true);

      try {
          const data = await user.api.DeleteInvite(id);

          if (data.success && !data.error) {
            await getInvites();

            Noti("Successfully deleted Invite", "", "success");

            setDeleteInviteLoading(false);
          }
      } catch (err) {
          setDeleteInviteLoading(false);

          if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

          Noti('Error occurred', err.message, 'error')
      }
    };

    const UpdateText = async (type: string, value: any) => {
      try {
          if (value.length > 50) return Noti('Invalid Input', '', 'error');

          const data = await user.api.UpdateText(type, value);

          if (data.success && !data.error) {
            user = Object.assign({}, user);

            switch (type) {
              case 'contactEmail':
                  user.contactEmail.text = value;
                  onCloseEmail()
                  break;
              case 'instagram':
                  user.instagram.text = value;
                  onCloseIg()
                  break;
              case 'twitter':
                user.twitter.text = value;
                onCloUpdateSettingswitter()
                break;
              case 'github':
                user.github.text = value;
                onCloseGithub()
                break;
              case 'steam':
                user.steam.text = value;
                onCloseSteam()
                break;
              case 'age':
                user.age.text = value;
                //onCloseAge()
                break;
              case 'title':
                user.title = value;
                //onCloseAge()
                break;
              case 'bio':
                user.bio = value;
                //onCloseAge()
                break;
            }

            setUser(user);

            Noti('Successfully updated your Profile', 'go check it out', 'success')
          }
          if (data.error) Noti('Error occurred', data.error.message, 'error')
      } catch (err) {
        if (err instanceof APIError) return Noti('Error occurred', err.message, 'error')
        Noti('Error occurred', err.message, 'error')
      }
    };

    const UpdateProfile = async () => {
      setBioLoading(true);

      if (isNaN(Number(age))) {
        setBioLoading(false);
        Noti('Age must be Number', '', 'error');
        return;
      }

      try {
          const data = await user.api.UpdateProfile(title, age, bio);

          if (data.success && !data.error) {
            user = Object.assign({}, user);

            user.title = title;
            user.age.text = age;
            user.bio = bio;

            setUser(user);

            Noti('Successfully updated your Profile', 'go check it out', 'success')
            setBioLoading(false);
          }

          if (data.error) Noti('Error occurred', data.error.message, 'error')
      } catch (err) {
        setBioLoading(false);

        if (err instanceof APIError) return Noti('Error occurred', err.message, 'error');

        Noti('Error occurred', err.message, 'error')
      }
    };

    const UpdateSettings = async (property: string, value: boolean) => {
      try {
          let data: any = {};

          data[property] = value;

          data = await user.api.UpdateSettings(data);

          if (data.success && !data.error) {
              user = Object.assign({}, user);

              switch (property) {
                  case 'age':
                      user.age.show = value;
                      break;
                  case 'badges':
                    user.badges = value;
                    break;
                  case 'views':
                    user.showViews = value;
                    break;
                  case 'discord':
                    user.discord.show = value;
                    break;
                  case 'contactEmail':
                      user.contactEmail.show = value;
                      break;
                  case 'instagram':
                      user.instagram.show = value;
                      break;
                  case 'twitter':
                    user.twitter.show = value;
                    break;
                  case 'github':
                      user.github.show = value;
                      break;
                  case 'steam':
                    user.steam.show = value;
                    break;
              }

              setUser(user);
          }
      } catch (err) {
        if (err instanceof APIError) return Noti('Error occurred', err.message, 'error')
        Noti('Error occurred', err.message, 'error')
      }
  };

    const Visible = (<Badge colorScheme="green" fontSize="sm">Visible</Badge>)
    const Hidden = (<Badge colorScheme="red" fontSize="sm">Hidden</Badge>)
    const Soon = (<Badge colorScheme="cyan">Soon</Badge>)


    const NavLink = ({ children }: { children: ReactNode }) => (
        <Link
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: 'purple.500',
            color: 'white'
          }}
          color="white"
          href={'#'}>
          {children}
        </Link>
      );

    //if (user.ranks.developer) console.log('api - ' + user.api.getInvites().then(invitesd => (console.log(invitesd))));
    if (user.ranks.developer) console.log(invites);

    return (
      <>
        <div className={css.container}>

    <Box p={4} bg="gray.800" rounded="2xl" padding="25px" boxShadow="6px 7px 19px 0px rgba(66,153,225,0.75), -5px -6px 19px 0px rgba(159,122,234,0.75)">
      <Box bg={'gray.700'} px={4} rounded="xl">
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
              src={user.discord.avatar}
              />
              <Text fontSize="lg">{user.username}</Text>
              <Stack direction="row" spacing={1}>
              {user.badges && user.ranks.admin ? AdminBadge : null}
              {user.badges && user.ranks.developer ? DeveloperBadge : null}
              {user.badges && user.premium.active ? PremiumBadge : null}
              
              </Stack>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
              <Button
                colorScheme="gray"
                color="gray.400"
                variant="link"
                fontFamily="Work Sans"
                mr={5}
                onClick={() => {
                  getInvites();
                  onOpenInvite();
                }}
              >
                  invites
              </Button>
              {user.ranks.admin ? <Button
                isLoading={EnterAdminLoading}
                colorScheme="gray"
                color="gray.400"
                variant="link"
                fontFamily="Work Sans"
                mr={5}
                onClick={() => {
                  setEnterAdminLoading(true);
                  window.open('/dashboard/admin', '_self')
                }}
              >
                  enter admin
              </Button> : null}
              <Button
                isLoading={LogoutLoading}
                colorScheme="red"
                bg="red.100"
                color="red.600"
                _hover={{ bg: 'red.200', color: 'red.600' }}
                onClick={Logout}
                fontFamily="Work Sans"
              >
                  logout
              </Button>
          </Flex>
        </Flex>

        {isOpenMobile ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            </Stack>
          </Box>
        ) : null}
      </Box>
        <Center>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Image
      src="https://upload.hicoria.com/files/jtzfNcXZ.png"
      maxW="40%"
      margin="0 auto"
      />
      <Box
      w="full"
      mt={3}
      mb={3}
      bg="gray.900"
      shadow="xl"
      color="white"
      padding="10px 10px 10px 30px"
      rounded="lg"
      display="flex"
      position="relative"
      >
      <Heading size="sm" fontFamily="Work Sans" color="gray.400" fontWeight="500" display="block">motd <span style={{color: 'white', marginLeft: '0.5rem'}}>{stats ? stats.motd : <Spinner />}</span></Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'profile views'}
          stat={user.views ? user.views : 'N/A'}
          icon={<FiUserPlus size={'3em'} />}
        />
        <StatsCard
          title={'contact redirects'}
          stat={'N/A'}
          icon={<FiLink size={'3em'} />}
        />
        <StatsCard
          title={'profile created'}
          stat={user.dates.registrationDate ? `${new Date(user.dates.registrationDate).toLocaleDateString()}` : 'N/A'}
          icon={<AiOutlineFileAdd size={'3em'} />}
        />
        <StatsCard
          title={'last edit'}
          stat={user.dates.editDate ? `${new Date(user.dates.editDate).toLocaleDateString()}` : 'N/A'}
          icon={<FiEdit2 size={'3em'} />}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      <Box
        bg={'gray.900'}
        w="full"
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
            <Tooltip label="If is feature enabled, it will show up on your profile card" aria-label="Tooltip">
            <Heading size="md" fontFamily="Work Sans">General Settings</Heading>
            </Tooltip>
            <Text>{Soon} Discord Embed</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.age.show} onChange={() => {
              if (user.age.show) UpdateSettings('age', false)
              if (!user.age.show) UpdateSettings('age', true)
            }}/>Show Age</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.badges} onChange={() => {
              if (user.badges) UpdateSettings('badges', false)
              if (!user.badges) UpdateSettings('badges', true)
            }}/>Show loady Badges</Text>
            <Text>{Soon} Light/Dark Mode</Text>
            <Text>{Soon} Custom Background & Aliases</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.showViews} onChange={() => {
              if (user.showViews) UpdateSettings('views', false)
              if (!user.showViews) UpdateSettings('views', true)
            }}/>Show Views on Profile</Text>

            </Stack>

      </Box>
      <Box
        bg={'gray.900'}
        w="full"
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
            <Tooltip label="If is feature enabled, it will show up on your profile card" aria-label="Tooltip">
            <Heading size="md" fontFamily="Work Sans">Socials Manager</Heading>
            </Tooltip>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.discord.show} onChange={() => {
              if (user.discord.show) UpdateSettings('discord', false)
              if (!user.discord.show) UpdateSettings('discord', true)
            }}/>Show Discord</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.contactEmail.show} onChange={() => {
              if (user.contactEmail.show) UpdateSettings('contactEmail', false)
              if (!user.contactEmail.show) UpdateSettings('contactEmail', true)
            }}/>{user.contactEmail.show ? <IconButton boxShadow="7px 7px 9px -8px rgba(66,153,225,0.75), -7px -7px 9px -8px rgba(159,122,234,0.75);" onClick={onOpenEmail} aria-label="E-Mail Settings" icon={<FaWrench />} rounded="full" size="xs" bg="gray.800" _hover={{ bg: 'gray.700' }} mr={2} /> : null}Contact Email</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.instagram.show} onChange={() => {
              if (user.instagram.show) UpdateSettings('instagram', false)
              if (!user.instagram.show) UpdateSettings('instagram', true)
            }}/>{user.instagram.show ? <IconButton boxShadow="7px 7px 9px -8px rgba(66,153,225,0.75), -7px -7px 9px -8px rgba(159,122,234,0.75);" onClick={onOpenIg} aria-label="Instagram Settings" icon={<FaWrench />} rounded="full" size="xs" bg="gray.800" _hover={{ bg: 'gray.700' }} mr={2} />: null}Instagram</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.twitter.show} onChange={() => {
              if (user.twitter.show) UpdateSettings('twitter', false)
              if (!user.twitter.show) UpdateSettings('twitter', true)
            }}/>{user.twitter.show ? <IconButton boxShadow="7px 7px 9px -8px rgba(66,153,225,0.75), -7px -7px 9px -8px rgba(159,122,234,0.75);" onClick={onOpenTwitter} aria-label="Twitter Settings" icon={<FaWrench />} rounded="full" size="xs" bg="gray.800" _hover={{ bg: 'gray.700' }} mr={2} /> : null}Twitter</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.github.show} onChange={() => {
              if (user.github.show) UpdateSettings('github', false)
              if (!user.github.show) UpdateSettings('github', true)
            }}/>{user.github.show ? <IconButton boxShadow="7px 7px 9px -8px rgba(66,153,225,0.75), -7px -7px 9px -8px rgba(159,122,234,0.75);" onClick={onOpenGithub} aria-label="Github Settings" icon={<FaWrench />} rounded="full" size="xs" bg="gray.800" _hover={{ bg: 'gray.700' }} mr={2} /> : null}GitHub</Text>
            <Text><Switch size="md" colorScheme="green" mr={2} isChecked={user.steam.show} onChange={() => {
              if (user.steam.show) UpdateSettings('steam', false)
              if (!user.steam.show) UpdateSettings('steam', true)
            }}/>{user.steam.show ? <IconButton boxShadow="7px 7px 9px -8px rgba(66,153,225,0.75), -7px -7px 9px -8px rgba(159,122,234,0.75);" onClick={onOpenSteam} aria-label="Steam Settings" icon={<FaWrench />} rounded="full" size="xs" bg="gray.800" _hover={{ bg: 'gray.700' }} mr={2} /> : null} Steam</Text>

            </Stack>

      </Box>
      <Box
        bg={'gray.900'}
        w="full"
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
            w="full"
            >
            <Heading size="md" textAlign="center" fontFamily="Work Sans">Quick Actions</Heading>
            <Button
                display="flex"
                colorScheme="blue"
                bg="transparent"
                color="blue.500"
                size="sm"
                fontFamily="Work Sans"
                leftIcon={<FiEdit2 />}
                _hover={{ color: 'blue.500', bg: 'blue.200' }}
                onClick={onOpenBio}
            >edit profile</Button>
            <Button
                display="flex"
                colorScheme="blue"
                bg="transparent"
                color="blue.500"
                fontFamily="Work Sans"
                leftIcon={<AiFillEye />}
                size="sm"
                _hover={{ color: 'blue.500', bg: 'blue.200' }}
                onClick={() => window.open(`/${user.username}/`, '_blank')}
            >preview profile</Button>
            {user.discord.linked ? <Button
                display="flex"
                colorScheme="blue"
                leftIcon={<FaDiscord />}
                size="sm"
                fontFamily="Work Sans"
                bg="transparent"
                color="blue.500"
                _hover={{ color: 'blue.500', bg: 'blue.200' }}
                onClick={() => window.location.href = `${process.env.BACKEND_URL}/discord`}
            >relink discord</Button> : <Button
              display="flex"
              colorScheme="blue"
              leftIcon={<FaDiscord />}
              size="sm"
              bg="transparent"
              fontFamily="Work Sans"
              color="blue.500"
              _hover={{ color: 'blue.500', bg: 'blue.200' }}
              onClick={() => window.location.href = `${process.env.BACKEND_URL}/discord`}
          >link discord</Button>}

            {!user.disabled ? <Button
                isLoading={DisableLoading}
                display="flex"
                colorScheme="red"
                size="sm"
                bg="transparent"
                color="red.500"
                fontFamily="Work Sans"
                leftIcon={<GiSightDisabled />}
                _hover={{ color: 'red.500', bg: 'red.200' }}
                onClick={Disable}
            >disable profile</Button> : <Button
              isLoading={DisableLoading}
              display="flex"
              colorScheme="green"
              size="sm"
              bg="transparent"
              color="green.500"
              fontFamily="Work Sans"
              leftIcon={<GiSightDisabled />}
              _hover={{ color: 'green.500', bg: 'green.200' }}
              onClick={Enable}
          >enable profile</Button>}

          {user.ranks.admin ? <Button
                display="flex"
                colorScheme="orange"
                leftIcon={<FaTimes />}
                size="sm"
                fontFamily="Work Sans"
                bg="transparent"
                color="orange.500"
                _hover={{ color: 'orange.500', bg: 'orange.200' }}
                onClick={RevokeSessions}
            >revoke auth sessions</Button> : null}

            </Stack>

      </Box>
      </SimpleGrid>
    </Box>

          </Center>

      </Box>

      <Modal isOpen={isOpenEmail} onClose={CloseEmail}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Contact Email Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Heading size="sm" fontFamily="Inter">Your Contact Email</Heading>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaAt color="white" />}
                />
                <Input type="email" value={contactEmail} placeholder="Your Email" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('contactEmail', val.target.value)
                }} />
                </InputGroup>
                <Center><Heading size="xs" fontFamily="Inter">{user.contactEmail.show ? Visible : Hidden}</Heading></Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
            <Button w="full" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateText('contactEmail', contactEmail);
            }} onClick={() => {
              UpdateText('contactEmail', contactEmail);
            }}>
              Save
            </Button>
          </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>





      <Modal isOpen={isOpenIg} onClose={CloseIg}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Instagram Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Heading size="sm" fontFamily="Inter">Your Instagram</Heading>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaInstagram color="white" />}
                />
                <Input type="instagram" value={instagram} placeholder="IG name (without @)" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }} 
                onChange={(val) => {
                  setInput('instagram', val.target.value)
                }} />
                </InputGroup>
                <Center><Heading size="xs" fontFamily="Inter">{user.instagram.show ? Visible : Hidden}</Heading></Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
            <Button w="full" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateText('instagram', instagram);
            }} onClick={() => {
              UpdateText('instagram', instagram);
            }}>
              Save
            </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>




      <Modal isOpen={isOpenTwitter} onClose={CloUpdateSettingswitter}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Twitter Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Heading size="sm" fontFamily="Inter">Your Twitter</Heading>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaTwitter color="white" />}
                />
                <Input type="twitter" value={twitter} placeholder="Twitter Name (without @)" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('twitter', val.target.value)
                }} />
                </InputGroup>
                <Center><Heading size="xs" fontFamily="Inter">{user.twitter.show ? Visible : Hidden}</Heading></Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
            <Button w="full" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateText('twitter', twitter);
            }} onClick={() => {
              UpdateText('twitter', twitter);
            }}>
              Save
            </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenGithub} onClose={CloseGithub}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">GitHub Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Heading size="sm" fontFamily="Inter">Your GitHub</Heading>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaGithub color="white" />}
                />
                <Input type="github" value={github} placeholder="GitHub Name" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }} />
                </InputGroup>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaGithub color="white" />}
                />
                <Input type="github" placeholder="GitHub Link" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('github', val.target.value)
                }} />
                </InputGroup>
                <Center><Heading size="xs" fontFamily="Inter">{user.github.show ? Visible : Hidden}</Heading></Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
            <Button w="full" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateText('github', github);
            }} onClick={() => {
              UpdateText('github', github);
            }}>
              Save
            </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenInvite} onClose={onCloseInvite} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Invite Manager</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Table size="sm" variant="unstyled" bg="gray.800" rounded="md">
                  <Thead>
                    <Tr>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Code</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Created</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Used</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {invites.map(inv => (
                    inv.usedBy === null ?
                    <Tr color="white">
                      <Td fontFamily="monospace">{inv._id}</Td>
                      <Td>{new Date(inv.dateCreated).toLocaleDateString()}</Td>
                      <Tooltip label="Invite is available" bg="gray.700"><Td textAlign="center"><Icon as={FaTimesCircle} color="green.500" /></Td></Tooltip>
                      <Td>
                      <Stack direction="row" spacing={1}>
                      <Tooltip label="Copy Invite to clipboard" bg="gray.700"><IconButton aria-label="Copy Invite" colorScheme="green" size="xs" icon={<FaCopy />}
                      onClick={() => {
                        //navigator.clipboard.writeText(`https://loady.host/?code=${inv._id}`)
                        navigator.clipboard.writeText(`${inv._id}`).then(() => Noti("", "Copied Invite to clipboard", "success"))
                      }}
                      /></Tooltip>
                      <Tooltip label="Deletes Invite" bg="gray.700"><IconButton aria-label="Delete Invite" colorScheme="red" size="xs" icon={<FaTrash />} isLoading={DeleteInviteLoading} onClick={() => DeleteInvite(inv._id)} /></Tooltip>
                      </Stack>
</Td>
                    </Tr> : null
                  ))}
                  </Tbody>
              </Table>
              <Table size="sm" variant="unstyled" bg="gray.800" rounded="md">
                  <Thead>
                    <Tr>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Code</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Created</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Used By</Th>
                      <Th fontFamily="Work Sans" textTransform="lowercase" color="gray.400">Link</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {invites.map(inv => (
                    inv.usedBy ? 
                    <Tr color="white">
                      <Td fontFamily="monospace">{inv._id}</Td>
                      <Td>{new Date(inv.dateCreated).toLocaleDateString()}</Td>
                      <Td fontFamily="monospace">{inv.usedBy}</Td>
                      <Td>
                      <Stack direction="row" spacing={1}>
                      <Tooltip label="Copy Invite to clipboard" bg="gray.700"><IconButton aria-label="Copy Invite" colorScheme="green" size="xs" icon={<FaCopy />}
                      onClick={() => {
                        //navigator.clipboard.writeText(`https://loady.host/?code=${inv._id}`)
                        navigator.clipboard.writeText(`${inv._id}`).then(() => Noti("", "Copied Invite to clipboard", "success"))
                      }}
                      /></Tooltip>
                      {/*<Tooltip label="Deletes Invite" bg="gray.700"><IconButton aria-label="Delete Invite" colorScheme="red" size="xs" icon={<FaTrash />} /></Tooltip>*/}
                      </Stack></Td>
                    </Tr> : null
                  ))}
                  </Tbody>
              </Table>
            </Stack>
          </ModalBody>

          {user.ranks.admin ? <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
          <Button isLoading={GenerateLoading} w="full" leftIcon={<FaEnvelopeOpen />} colorScheme="green" mr={3} onClick={GenerateInvite}>
              Generate Invite
            </Button>
          </Stack>
          </ModalFooter> : null}
        </ModalContent>
      </Modal>





      <Modal isOpen={isOpenSteam} onClose={CloseSteam}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Steam Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <Heading size="sm" fontFamily="Inter">Your Steam Links</Heading>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaSteam color="white" />}
                />
                <Input type="steam" value={steam} placeholder="Steam Link" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('steam', val.target.value)
                }} />
                </InputGroup>
                <Center><Heading size="xs" fontFamily="Inter">{user.instagram.show ? Visible : Hidden}</Heading></Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
          <Button w="full" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateText('steam', steam);
            }} onClick={() => {
              UpdateText('steam', steam);
            }}>
              Save
            </Button>
          </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenBio} onClose={CloseBio}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader color="white">Edit Profile</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack direction="column" spacing={3}>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaIdCardAlt color="white" />}
                />
                <Input type="title" value={title} placeholder="Custom Title (e.g. Developer)" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('title', val.target.value)
                }} />
                </InputGroup>
                <InputGroup size="sm">
                <InputLeftElement
                pointerEvents="none"
                children={<FaBirthdayCake color="white" />}
                />
                <Input type="age" value={age} placeholder="Age" variant="filled" color="gray.300" bg="gray.600" border="1px solid #4A5568" rounded="md" _hover={{ bg: 'gray.700', border: '1px solid #4A5568' }}
                onChange={(val) => {
                  setInput('age', val.target.value)
                }} />
                </InputGroup>
                <Textarea 
                borderColor="gray.600" 
                value={bio}
                placeholder="Bio Content"
                color="gray.200"
                bg="gray.600"
                variant="filled"
                resize="none"
                overflow="hidden"
                _hover={{ borderColor: 'gray.600' }}
                h="360px"
                maxH="360px"
                onChange={(val) => {
                  setInput('bio', val.target.value)
                }}
                ></Textarea>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Stack direction="column" w="full" spacing={2}>
            <Button isLoading={BioLoading} w="100%" leftIcon={<FaRegSave />} colorScheme="green" mr={3} onPressEnter={() => {
              UpdateProfile();
            }} onClick={() => {
              UpdateProfile();
            }}>
              Save
            </Button>
          </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
        </>
    );
  };