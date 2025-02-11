import { View, Text } from 'react-native';
import { Profile } from '../types/Profile';

const UserListItem = ({ user }: { user: Profile }) => {
	return (
		<View style={{ padding: 15, backgroundColor: 'white' }}>
			<Text style={{ fontWeight: '600' }}>{user.full_name}</Text>
		</View>
	);
};

export default UserListItem;
