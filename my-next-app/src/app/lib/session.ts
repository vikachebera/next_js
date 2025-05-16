import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export const getUserSession = async () => {
    const session = await getServerSession(authOption);
    return session?.user || null;
};
