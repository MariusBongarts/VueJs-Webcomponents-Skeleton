export interface NavItemMain {
  name: string,
  displayName: string,
  route: string,
  icon: string,

  // Either the navItem should be placed in top of navbar (true) or at bottom (false)
  main: boolean
}
