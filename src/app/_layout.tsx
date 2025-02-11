import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '../providers/AuthProvider';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

// define global providers
export default function RootLayout() {
	useEffect(() => {
		const run = async () => {
			if (Platform.OS === 'android') {
				await PermissionsAndroid.requestMultiple([
					PermissionsAndroid.PERMISSIONS.CAMERA,
					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
					PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
					PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
				]);
			}
		};
		run();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<Slot />
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
