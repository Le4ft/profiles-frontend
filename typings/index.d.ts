import API from '../api';

interface User {
    /**
     * The user's access token.
     */
    accessToken: string;

    /**
     * The api.
     */
    api: API;

    /**
     * All of the domains.
     */
    domains: Array<{
        name: string;
        wildcard: boolean;
        donated: boolean;
        donatedBy: string;
        userOnly: boolean;
        dateAdded: Date;
        users: number;
    }>;

    /**
     * An array of the user's shortened urls.
     */
    shortenedUrls: Array<{
        shortId: string;
        destination: string;
        deletionKey: string;
        timestamp: Date;
        user: string;
    }>

    /**
     * All of the images the user has uploaded.
     */
    images: Array<{
        link: string;
        dateUploaded: string;
        filename: string;
        size: string;
        domain: string;
        expiration: Date;
    }>;

    version: string;

    archives: Array<{
        link: string;
        name: string;
        user: string;
        created: Date;
        key: string;
        Location: string;
        size: string;
    }>;

    /**
     * All of the user's created invites.
     */
    createdInvites: Array<{
        _id: string;
        dateCreated: Date;
    }>;

    /**
     * The amount of storage the user has used.
     */
    motd: string;

    storageUsed: string;

    archiveStorage: string;

    _id: string;
  
    username: string;
  
    password: string;
  
    email: string;
  
    invite: string;
  
    cooldowns: {
      lastUsernameChange: Date;

      lastDisable: Date;
    };
  
    dates: {
      registrationDate: Date;
  
      loginDate: Date;

      editDate: Date;
    };
  
    discord: {
      show: boolean;
  
      linked: boolean;
      
      id: string;
  
      username: string;
  
      discriminator: number;
  
      avatar: string;
    };
  
    banned: {
      active: boolean;
  
      reason: string;

      admin: {
        uuid: string;
        username: string;
      }
    };
  
    showViews: boolean;
  
    views: number;
  
    invites: number;
  
    invitedBy: string;
  
    invitedUsers: string[];
  
    ranks: {
      admin: boolean;
  
      developer: boolean;
    }
  
    premium: {
      active: boolean;
  
      expiration: Date;
    }

    disabled: boolean;
  
    verified: boolean;

    badges: boolean;

    icons: boolean;
  
    title: string;
  
    bio: string;
  
    age: {
      show: boolean;
  
      text: string;
    }
  
    contactEmail: {
      show: boolean;
  
      text: string;
    }
  
    instagram: {
      show: boolean;
  
      text: string;
    }

    github: {
      show: boolean;
  
      text: string;
    }
  
    twitter: {
      show: boolean;
  
      text: string;
    }

    steam: {
      show: boolean;
  
      text: string;
    }

    total: string;
    banned: string;
    disabled: string;
    unusedInvites: string;
    premium: string;
    version: string;
    statsStorageUsed: string;
    statsDomains: string;
    statspastes: string;
    files: string;
    statsRegisteredToday: string;
    statsLoggedToday: string;
    statsUploadsToday: string;
}

interface IUserContext {
    /**
     * The user.
     */
    user: User;

    /**
     * Set the user.
     * @param {object} User the user.
     */
    setUser(user: User): void;
}

interface Stats {
    /**
     * The user's access token.
     */
    accessToken: string;

    /**
     * The api.
     */
    api: API;

    total: string;
    banned: string;
    disabled: string;
    unusedInvites: string;
    premium: string;
    version: string;
    statsStorageUsed: string;
    statsDomains: string;
    statspastes: string;
    files: string;
    statsRegisteredToday: string;
    statsLoggedToday: string;
    statsUploadsToday: string;
}

interface IStatsContext {
  /**
   * The user.
   */
  stats: Stats;

  /**
   * Set the user.
   * @param {object} User the user.
   */
  setUser(stats: Stats): void;
}

export interface Invite {
  _id: string;

  dateCreated: Date;

  dateUsed: Date;

  usedBy: string;

  used: boolean;

  useable: boolean;
}

export {
    User,
    IUserContext,
};