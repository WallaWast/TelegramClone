import { ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';

export default function MainTab() {
	return <ChannelList onSelect={(channel) => router.push(`/channel/${channel.cid}`)} />;
}
