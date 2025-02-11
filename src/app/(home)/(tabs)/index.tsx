import React from 'react';
import { ChannelList } from 'stream-chat-expo';
import { Link, router, Stack } from 'expo-router';
import { useAuth } from '../../../providers/AuthProvider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text } from 'react-native';

export default function MainTab() {
	const { user } = useAuth();

	// if (!user) {
	// 	return null;
	// }

	return (
		<>
			<Stack.Screen
				options={{
					headerRight: () => (
						<Link href={'/(home)/users'} asChild>
							<FontAwesome5 name='users' size={22} color='gray' style={{ marginHorizontal: 10 }} />
						</Link>
					),
				}}
			/>
			<ChannelList
				filters={{ members: { $in: [user?.id ?? ''] } }}
				onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
			/>
		</>
	);
}
