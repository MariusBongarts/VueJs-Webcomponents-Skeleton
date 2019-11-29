import { NavItemMain } from './models/NavItemMain';
export const NAV_ITEMS_MAIN: NavItemMain[] = [
  {
    name: 'home',
    displayName: 'Home',
    icon: 'HomeIcon',
    route: 'home',
    main: true,
  },
  {
    name: 'directories',
    displayName: 'Directories',
    icon: 'FolderIcon',
    route: 'directories',
    main: true,
  },
  {
    name: 'bookmarks',
    displayName: 'Bookmarks',
    icon: 'BookmarkIcon',
    route: 'bookmarks',
    main: true,
  },
  {
    name: 'tags',
    displayName: 'Tags',
    icon: 'TagIcon',
    route: 'tags',
    main: true,
  },
  {
    name: 'account',
    displayName: 'Account',
    icon: 'AccountIcon',
    route: 'account',
    main: false,
  },
  {
    name: 'settings',
    displayName: 'Settings',
    icon: 'SettingsIcon',
    route: 'settings',
    main: false,
  },
];
