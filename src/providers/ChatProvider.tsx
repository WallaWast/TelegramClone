import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({ children }: PropsWithChildren) {
	const [isReady, setIsReady] = useState(false);

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
			setIsReady(true);

			// const channel = client.channel('messaging', 'the_museum', { name: 'Museum' });

			// await channel.watch();
		};

		connect();
	});

	if (!isReady) {
		return <ActivityIndicator />;
	}

	return (
		<OverlayProvider>
			<Chat client={client}>{children}</Chat>
		</OverlayProvider>
	);
}
