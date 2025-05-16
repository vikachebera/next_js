import Menu from "@/components/Menu/Menu";
import 'src/styles/main.scss'
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {getUserSession} from "@/app/lib/session";

export default async function Home() {
    const session = await getServerSession(authOption);

    return (
        <div className='grid grid-cols-4 gap-4'>
            <Menu/>
            <div className='col-span-3'>

                {session ? (
                    <p>User logged in: {session.user?.name}</p>
                ) : (
                    <p>No user session</p>
                )}

                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </div>

    )
        ;
}
