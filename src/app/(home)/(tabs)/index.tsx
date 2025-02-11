import { ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';
import { useAuth } from '../../../providers/AuthProvider';
import { Text } from 'react-native';

export default function MainTab() {
	const { user } = useAuth();

	// if (!user) {
	// 	return null;
	// }

	return (
		<ChannelList
			filters={{ members: { $in: [user?.id ?? ''] } }}
			onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
		/>
	);
}
