import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// define global providers
export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Slot />
		</GestureHandlerRootView>
	);
}
