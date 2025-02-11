import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Profile } from '../../types/Profile';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';
import UserListItem from '../../components/UserListItem';

export default function UsersScreen() {
	const [users, setUsers] = useState<Profile[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchUsers = async () => {
			// Use the generic to tell supabase the shape of each profile
			let { data: profiles, error } = await supabase.from('profiles').select('*').neq('id', user?.id); // exclude me

			if (error) {
				// handle error if needed
				return;
			}

			// If any transformation is needed, map each profile. Otherwise, assign directly.
			if (profiles) {
				const convertedProfiles: Profile[] = profiles.map((profile: Profile) => {
					// Perform any transformation if needed
					return profile;
				});
				setUsers(convertedProfiles);
			}
		};

		fetchUsers();
	}, []);

	//console.log('users', users);

	return (
		<FlatList data={users} contentContainerStyle={{ gap: 5 }} renderItem={({ item }) => <UserListItem user={item} />} />
	);
}
