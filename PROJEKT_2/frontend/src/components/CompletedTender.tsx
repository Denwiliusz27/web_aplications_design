import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Tender} from "../models/Tender";
import Api from "../Api";
import {Offer} from "../models/Offer";

function CompletedTender() {
    const {id} = useParams()

    const completedTender = useQuery<Tender>({
        queryKey: ["completedTender", id],
        queryFn: () => {
            return Api.get(`przetargi/zakonczone/${id}`)
                .then((res) => res.data)
        },
        enabled: true,
    })

    const offers = useQuery<Offer[]>({
        queryKey: ["offers", id],
        queryFn: () => {
            return Api.get(`oferty/${id}`)
                .then((res) => {
                    return res.data
                })
        },
        enabled: true,
    })

    return (
        <>
            <h1 className="text-center text-xl font-bold pb-10">Szczegóły przetargu</h1>
            {completedTender.isFetching ? (
                <p className="text-center">Ładowanie danych...</p>
            ) : (
                <div>
                    {completedTender.isSuccess ?
                        <>
                            <div className="w-1/3 mx-auto flex flex-col ">
                                <div className="flex flex-row py-3">
                                    <div className="basis-1/3 text-center font-bold">
                                        <p>Numer Porządkowy</p>
                                    </div>
                                    <div className="basis-2/3 text-center my-auto">
                                        <p>{id}</p>
                                    </div>
                                </div>

                                <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                <div className="flex flex-row py-3">
                                    <div className="basis-1/3 text-center font-bold">
                                        <p>Przedmiot przetargu</p>
                                    </div>
                                    <div className="basis-2/3 text-center my-auto">
                                        <p>{completedTender.data.title}</p>
                                    </div>
                                </div>

                                <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                <div className="flex flex-row py-3">
                                    <div className="basis-1/3 text-center font-bold">
                                        <p>Instytucja zamawiająca</p>
                                    </div>
                                    <div className="basis-2/3 text-center my-auto">
                                        <p>{completedTender.data.contracting_authority}</p>
                                    </div>
                                </div>

                                <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                <div className="flex flex-row py-3">
                                    <div className="basis-1/3 text-center font-bold">
                                        <p>Status</p>
                                    </div>
                                    <div className="basis-2/3 text-center my-auto">
                                        <p className="text-red-600 font-medium">Zakończony</p>
                                    </div>
                                </div>

                                <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                <div className="flex flex-row py-3">
                                    <div className="basis-1/3 text-center font-bold">
                                        <p>Opis</p>
                                    </div>
                                    <div className="basis-2/3 text-center my-auto">
                                        <p>{completedTender.data.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/3 mx-auto border border-b-3 border-amber-500 rounded-2xl p-5 my-10">
                                <h1 className="text-center text-xl font-bold pb-6">Złożone oferty</h1>
                                <div>
                                    {offers.data?.length > 0 ? (
                                        <>
                                            <div className="w-full px-6 flex flex-col">
                                                <div className="flex flex-row text-center font-medium">
                                                    <p className="basis-2/3 ">Składający</p>
                                                    <p className="basis-1/3 ">Wartość</p>
                                                </div>
                                                <hr className="h-px my-3 bg-gray-200 border-0 h-0.5 dark:bg-gray-700"/>
                                            </div>

                                            <ul role="list" className="w-full p-6 divide-y divide-slate-200">
                                                {offers.data?.map((offer) => (
                                                    <li className="first:pt-0 last:pb-0 py-4" key={offer.id}>
                                                        <div className="flex text-center items-center">
                                                            <p className="basis-2/3 font-medium">{offer.bidder}</p>
                                                            <p className="basis-1/3 ">{offer.value}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <p className="text-center font-medium text-red-600">Przetarg zakończony bez rozstrzygnięcia</p>
                                    )}
                                </div>
                            </div>
                        </>
                        : (
                            <div className="mx-auto">
                                <p className="text-red-600 font-bold text-center">Błąd</p>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default CompletedTender