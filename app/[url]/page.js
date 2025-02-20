
import Cals from "@/components/Cals";
export const dynamic = 'force-dynamic';

export default async function Home({params}) {

    const url = (await params).url

  return (
    <Cals url={url} />
    )
}

  
