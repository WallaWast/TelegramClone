import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import * as Crypto from 'expo-crypto';
import { useAuth } from '../../../providers/AuthProvider';

export default function ChannelScreen() {
	const [channel, setChannel] = useState<ChannelType | null>(null);
	const [chatTitle, setChatTitle] = useState('Chat');
	const { cid } = useLocalSearchParams<{ cid: string }>();
	const { user } = useAuth();
	const { client } = useChatContext();
	const videoClient = useStreamVideoClient();

	useEffect(() => {
		const fetchChannel = async () => {
			const channels = await client.queryChannels({ cid });
			if (channels.length === 0) return;
			const fetchedChannel = channels[0];
			setChannel(fetchedChannel);

			// Get channel members and filter out the current user.
			const members = fetchedChannel.state.members;
			if (members) {
				const otherMembers = Object.values(members).filter((member: any) => member.user.id !== user?.id);

				if (otherMembers) {
					if (otherMembers.length === 1 && otherMembers[0]) {
						// Check for either "name" or "fullName" property
						const memberName = otherMembers[0].user?.name || 'Chat';
						setChatTitle(memberName);
					} else if (otherMembers.length > 1) {
						setChatTitle('Group chat');
					}
				}
			}
		};
		fetchChannel();
	}, [cid, client, user]);

	const joinCall = async () => {
		if (!videoClient) return;

		// console.log(JSON.stringify(channel?.state.members, null, 2));
		const members = Object.values(channel?.state.members || {}).map((member: any) => ({ user_id: member.user_id }));
		// console.log(JSON.stringify(members, null, 2));

		const call = videoClient.call('default', Crypto.randomUUID());
		await call.getOrCreate({ ring: true, data: { members } });
		router.push(`/call/${call.id}`);
	};

	if (!channel) {
		return <ActivityIndicator />;
	}

	return (
		<Channel channel={channel} audioRecordingEnabled>
			<Stack.Screen
				options={{
					title: chatTitle,
					headerRight: () => <Ionicons name='call' size={24} color='black' onPress={joinCall} />,
				}}
			/>
			<MessageList />
			<SafeAreaView edges={['bottom']}>
				<MessageInput />
			</SafeAreaView>
		</Channel>
	);
}
