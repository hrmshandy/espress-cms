import { auth } from "@espress/auth"; // import your auth config
 
export default defineEventHandler((event) => {
	return auth.handler(toWebRequest(event));
});