import { useCalls } from '@stream-io/video-react-native-sdk';
import { router, useSegments } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import {} from 'react-native-safe-area-context';

export default function CallProvider({ children }: PropsWithChildren) {
	const calls = useCalls();
	const call = calls[0];
	const segments = useSegments() as string[];
	const isOnCallScreen = segments.length > 1 && segments[1] === 'call';
	//const useSaf

	useEffect(() => {
		if (!call) return;

		if (!isOnCallScreen && call?.state?.callingState === 'ringing') router.push(`/call`);
	}, [call, call?.state?.callingState, isOnCallScreen]);

	return (
		<>
			{call && !isOnCallScreen && (
				<Pressable
					onPress={() => router.push(`/call`)}
					style={{
						position: 'absolute',
						backgroundColor: 'lightgreen',
						padding: 10,
						top: 20,
						left: 0,
						right: 0,
						zIndex: 1000,
					}}
				>
					<Text>
						Active call: {call?.id} ({call.state.callingState})
					</Text>
				</Pressable>
			)}
			{children}
		</>
	);
}
