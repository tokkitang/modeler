import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../../../lib/types/User';
import { getUserInfo } from '../../../lib/api/user/get-user-info';

export async function load(page: RequestEvent) {
	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;

	if (accessToken) {
		try {
			const userInfoResponse = await getUserInfo(accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;
		} catch (error) {
			console.error(error);
		}
	}

	return {
		accessToken,
		myUserInfo,
		isLogin
	};
}