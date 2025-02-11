import { Text, Pressable } from 'react-native';
import { Profile } from '../types/Profile';
import { useChatContext } from 'stream-chat-expo';
import { useAuth } from '../providers/AuthProvider';
import { router } from 'expo-router';

const UserListItem = ({ user }: { user: Profile }) => {
	const { client } = useChatContext();
	const { user: me } = useAuth();

	const onPress = async () => {
		if (!me) return;
		console.log('after me');
		const channel = client.channel('messaging', {
			members: [me.id, user.id],
		});

		await channel.watch();
		console.log('after watch');
		router.replace(`/(home)/channel/${channel.cid}`);
		console.log('after router replace');
	};

	return (
		<Pressable onPress={onPress} style={{ padding: 15, backgroundColor: 'white' }}>
			<Text style={{ fontWeight: '600' }}>{user.full_name}</Text>
		</Pressable>
	);
};

export default UserListItem;
