import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/plugins";

export const authClient = createAuthClient({
    baseURL: "https://3000-idx-template-authjs-multi-idiomagit-1742833803590.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev/",
    plugins: [twoFactorClient()],
    fetchOptions: {
        credentials: "include",
    }
});
