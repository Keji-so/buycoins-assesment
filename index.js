// query GetRepository {
//     search (query: "Ireade", type: USER, first: 1){
//     edges {
//       node {
//         ... on User {
//           bio
//           login
//           name
//           avatarUrl
//            repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
//       		 totalCount
//      			 nodes {
//         			name
//             	url
//               description
//               id
//               updatedAt
//               stargazerCount
//               forkCount
//               primaryLanguage {
//                  name
//               }
//      					 }
//    					 }
//         }
//       }
//     }
//   }
// }