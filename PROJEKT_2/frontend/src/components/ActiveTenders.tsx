import Api from "../Api";
import {useQuery} from "react-query";
import {Tender} from "../models/Tender";
import {Link, useNavigate} from "react-router-dom";

function ActiveTenders() {

    const tenders = useQuery<Tender[]>({
        queryKey: ["tenders"],
        queryFn: () => {
            return Api.get("przetargi/aktywne")
                .then((res) => res.data.data)
        },
        enabled: true,
    })

    return (
        <>
            <h1 className="text-center text-xl font-bold">Aktywne przetargi</h1>
            {tenders.isFetching ? (
                <p className="mx-auto pt-10 text-center">Ładowanie danych...</p>
            ) : (
                <div className="w-4/5 mx-auto pt-10">
                    <div className="w-full px-6 flex flex-col">
                        <div className="flex flex-row text-center font-medium">
                            <p className="basis-1/5 ">Numer porządkowy</p>
                            <p className="basis-1/5 ">Przedmiot przetargu</p>
                            <p className="basis-1/5 ">Data rozpoczęcia</p>
                            <p className="basis-1/5 ">Data zakończenia</p>
                        </div>
                        <hr className="h-px my-3 bg-gray-200 border-0 h-0.5 dark:bg-gray-700"/>
                    </div>

                    <ul role="list" className="w-full p-6 divide-y divide-slate-200 mt-2">
                        {tenders.data?.map((tender) => (
                            <li className="first:pt-0 last:pb-0 py-8" key={tender.id}>
                                <div className="flex text-center items-center">
                                    <p className="basis-1/5 ">{tender.id}</p>
                                    <p className="basis-1/5 font-medium">{tender.title}</p>
                                    <p className="basis-1/5 ">{new Date(tender.start_date).toLocaleString()}</p>
                                    <p className="basis-1/5 ">{new Date(tender.end_date).toLocaleString()}</p>
                                    <div className="basis-1/5">
                                        {tender.active ? (
                                            <Link to={{pathname: `/aktywne/${tender.id}`}}
                                                  className="px-8 py-2 transition hover:scale-110 delay-150 rounded-lg bg-amber-500
                                                             hover:bg-amber-700 hover:shadow-amber-700 text-white shadow-lg shadow-amber-500">
                                                Szczegóły
                                            </Link>
                                        ) : (
                                            <p className="text-red-600 font-medium">Przetarg nierozpoczęty</p>
                                        )}
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

export default ActiveTenders