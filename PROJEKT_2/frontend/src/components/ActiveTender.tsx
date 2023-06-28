import {useQuery} from "react-query";
import {Tender} from "../models/Tender";
import Api from "../Api";
import {useParams} from "react-router-dom";

function ActiveTender() {
    const {id} = useParams()

    const tender = useQuery<Tender>({
        queryKey: ["tender", id],
        queryFn: () => {
            return Api.get(`przetargi/aktywne/${id}`)
                .then((res) => res.data)
        },
        enabled: true,
    })

    return (
        <>
            <h1 className="text-center text-xl font-bold pb-10">Szczegóły przetargu</h1>
            {tender.isFetching ? (
                <p className="text-center">Ładowanie danych...</p>
            ) : (
                <div>
                    {tender.isSuccess ?
                        <>
                            {tender.data.active ? (
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
                                            <p>{tender.data.title}</p>
                                        </div>
                                    </div>

                                    <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                    <div className="flex flex-row py-3">
                                        <div className="basis-1/3 text-center font-bold">
                                            <p>Instytucja zamawiająca</p>
                                        </div>
                                        <div className="basis-2/3 text-center my-auto">
                                            <p>{tender.data.contracting_authority}</p>
                                        </div>
                                    </div>

                                    <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                    <div className="flex flex-row py-3">
                                        <div className="basis-1/3 text-center font-bold">
                                            <p>Data rozpoczęcia</p>
                                        </div>
                                        <div className="basis-2/3 text-center my-auto">
                                            <p>{new Date(tender.data.start_date).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                    <div className="flex flex-row py-3">
                                        <div className="basis-1/3 text-center font-bold">
                                            <p>Data zakończenia</p>
                                        </div>
                                        <div className="basis-2/3 text-center my-auto">
                                            <p>{new Date(tender.data.end_date).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <hr className="border-amber-500 border-1 w-full mx-auto"></hr>

                                    <div className="flex flex-row py-3">
                                        <div className="basis-1/3 text-center font-bold">
                                            <p>Data zakończenia</p>
                                        </div>
                                        <div className="basis-2/3 text-center my-auto">
                                            <p>{tender.data.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mx-auto">
                                    <p className="text-red-600 font-bold text-center">Przetarg nieaktywny</p>
                                </div>
                            )}
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

export default ActiveTender