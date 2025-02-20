
import Cals from "@/components/Cals";
export const dynamic = 'force-dynamic';

export default async function Home({params}) {

    const url = (await params).url

    return (
        <>
            {url.split('https%3A%2F%2F')[0] == ''
                ?<Cals url={url} />
                :<></>
            }
        </>
    )
}

  
