export interface NavItem {
  label: string
  to: string
  hash?: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/', hash: 'about' },
  { label: 'Rooms', to: '/', hash: 'rooms' },
  { label: 'Contact', to: '/', hash: 'contact' },
]
