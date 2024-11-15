interface NavigationItem {
  hrefLink: string;
  name: string;
}

// interface NavigationListProps {
//   items: NavigationItem[];
// }
export const navigationItems: NavigationItem[] = [
  { hrefLink: "/", name: "Home" },
  { hrefLink: "/dashboard", name: "Docs" },
  // { hrefLink: "/sign-up", name: "Sign Up" },
  { hrefLink: "/contact", name: "Contact" },
  // { hrefLink: "/sign-in", name: "Sign In" },
];
