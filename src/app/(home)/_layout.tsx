import { Slot, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance('sz9zp7ve78m9');

export default function HomeLayout() {
	useEffect(() => {
		const connect = async () => {
			await client.connectUser(
				{
					id: 'wast',
					name: 'wast',
					image: 'https://getstream.io/random_png/?id=wast&name=wast',
				},
				client.devToken('wast')
			);

			// const channel = client.channel('messaging', 'the_museum', { name: 'Museum' });

			// await channel.watch();
		};

		connect();
	});

	return (
		<OverlayProvider>
			<Chat client={client}>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				</Stack>
			</Chat>
		</OverlayProvider>
	);
}
