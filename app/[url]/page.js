
import Cals from "@/components/Cals";

export default async function Home({params}) {

    const url = (await params).url

  return (
    <Cals url={url} />
    )
}

  
