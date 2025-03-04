import {
	Call,
	CallContent,
	RingingCallContent,
	StreamCall,
	useCalls,
	useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function CallScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const calls = useCalls();
	const call = calls[0];
	// const [call, setCall] = useState<Call>();
	// const client = useStreamVideoClient();
	// if (!client) return null;

	// useEffect(() => {
	// 	const fetchCall = async () => {
	// 		const call = client.call('default', id);
	// 		await call.get();
	// 		setCall(call);
	// 	};

	// 	fetchCall();

	// 	return () => {
	// 		if (call) {
	// 			call.leave();
	// 		}
	// 	};
	// }, [id]);

	if (!call) {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push('/');
		}

		return null;
	}

	return (
		<StreamCall call={call}>
			<RingingCallContent />
		</StreamCall>
	);
}
