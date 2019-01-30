/**
 * Current active item in the sidebar from basic page
 *
 */
module.exports = `
  fragment sideNav on NodePage {
      fieldSidebarNavItem {
        entity {
          entityBundle
          ... on TaxonomyTermSidebarNavigation {
            tid
            name
            fieldIcon
            fieldNavItemLink {
              uri
              url {
                path
              }
            }
          }
        }
      }
}
`;
