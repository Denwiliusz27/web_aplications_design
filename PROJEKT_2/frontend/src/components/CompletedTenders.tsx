import {useQuery} from "react-query";
import {Tender} from "../models/Tender";
import Api from "../Api";
import {Link} from "react-router-dom";

function CompletedTenders() {
    const completedTenders = useQuery<Tender[]>({
        queryKey: ["completedTenders"],
        queryFn: () => {
            return Api.get("przetargi/zakonczone")
                .then((res) => res.data)
        },
        enabled: true,
    })

    return (
        <>
            <h1 className="text-center text-xl font-bold">Zakończone przetargi</h1>
            {completedTenders.isFetching ? (
                <p className="mx-auto pt-10 text-center">Ładowanie danych...</p>
            ) : (
                <div className="w-4/5 mx-auto pt-10 pb-10">
                    <div className="w-full px-6 flex flex-col">
                        <div className="flex flex-row text-center font-medium">
                            <p className="basis-1/4 ">Numer porządkowy</p>
                            <p className="basis-1/4 ">Przedmiot przetargu</p>
                            <p className="basis-1/4 ">Status</p>
                        </div>
                        <hr className="h-px my-3 bg-gray-200 border-0 h-0.5 dark:bg-gray-700"/>
                    </div>

                    <ul role="list" className="w-full p-6 divide-y divide-slate-200 mt-2">
                        {completedTenders.data?.map((tender) => (
                            <li className="first:pt-0 last:pb-0 py-8" key={tender.id}>
                                <div className="flex text-center items-center">
                                    <p className="basis-1/4 ">{tender.id}</p>
                                    <p className="basis-1/4 font-medium">{tender.title}</p>
                                    <p className="basis-1/4 text-red-600 font-medium">Zakończony</p>
                                    <div className="basis-1/4">
                                        <Link to={{pathname: `/zakończone/${tender.id}`}}
                                              className="px-8 py-2 transition hover:scale-110 delay-150 rounded-lg bg-amber-500
                                                             hover:bg-amber-700 hover:shadow-amber-700 text-white shadow-lg shadow-amber-500">
                                            Szczegóły
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default CompletedTenders