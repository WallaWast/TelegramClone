import { User, StreamVideoClient, StreamVideo, StreamCall, CallContent } from '@stream-io/video-react-native-sdk';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const userId = '3b9ecbac-4945-484c-99ec-6ab13e26f1d8';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2I5ZWNiYWMtNDk0NS00ODRjLTk5ZWMtNmFiMTNlMjZmMWQ4In0.a4hYrMl25xqXLZOhyXY7QsNhz3Sb15BFY9gxHDqOhxU';
const callId = 'my-call-id';
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function CallScreen() {
	return (
		<StreamVideo client={client}>
			<StreamCall call={call}>
				<CallContent />
			</StreamCall>
		</StreamVideo>
	);
}
