import {gql} from '@apollo/client';

// export const GET_AUTHENTICATED_USER =gql`
//     query getAuthUser{
//         authUser{
//             _id
//             username
//             name
//             profilePicture
//         }
//     }
// `

export const GET_AUTHENTICATED_USER = gql`
	query GetAuthenticatedUser {
		authUser {
			_id
			username
			name
			profilePic
		}
	}
`;