import {useMutation, useQuery} from "react-query";
import {Tender} from "../models/Tender";
import Api from "../Api";
import {useParams} from "react-router-dom";
import {useState} from "react";

function ActiveTender() {
    const {id} = useParams()
    const [offerer, setOfferer] = useState("")
    const [value, setValue] = useState(0)
    const [valueError, setValueError] = useState("")
    const [error, setError] = useState("")
    const [info, setInfo] = useState("")
    const [tenderError, setTenderError] = useState("")

    const tender = useQuery<Tender>({
        queryKey: ["tender", id],
        queryFn: () => {
            return Api.get(`przetargi/aktywne/${id}`)
                .then((res) => res.data)
                .catch(() => {
                    setTenderError("Błąd przy pobieraniu danych odnośnie przetergu")
                })
        },
        enabled: true,
    })

    const createOffer = useMutation({
        mutationFn: async () => {
            return await Api.post(`oferty/dodaj/${id}`, {
                bidder: offerer,
                value: value,
            }).then((res) => res.data);
        },
        onError() {
            setError("Nie udało się złożyć oferty");
        },
        onSuccess() {
            setInfo("Pomyślnie dodano ofertę")
            setValue(0)
            setOfferer("")
        }
    });

    const handleOffererChange = (event: React.FormEvent<HTMLInputElement>) => {
        setOfferer(event.currentTarget.value);
        setInfo("")
    };

    const handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (isNaN(event.currentTarget.value)) {
            setValue(0)
        } else {
            setValue(parseInt(event.currentTarget.value));
        }
        setValueError("")
    };

    const addNewOffer = (e) => {
        e.preventDefault()
        const now = new Date()
        now.setHours(now.getHours() + 2)

        if (value <= 0) {
            setValueError("Wartość oferty powinna być liczbą dodatnią")
        } else if (now > new Date(tender.data.end_date)) {
            setError("Przetarg został zakończony")
            setValue(0)
            setOfferer("")
        } else {
            createOffer.mutate()
        }
    }

    return (
        <>
            <h1 className="text-center text-xl font-bold pb-10">Szczegóły przetargu</h1>
            {tender.isFetching ? (
                <p className="text-center">Ładowanie danych...</p>
            ) : (
                <div>
                    {tender.isSuccess ? (
                            <>
                                {tender.data.active ? (
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
                                                    <p>Opis</p>
                                                </div>
                                                <div className="basis-2/3 text-center my-auto">
                                                    <p>{tender.data.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="w-1/3 mx-auto border border-b-3 border-amber-500 rounded-2xl p-5 my-10">
                                            <h1 className="text-center text-xl font-bold pb-6">Złóż ofertę</h1>
                                            <form onSubmit={addNewOffer} className="flex flex-col">
                                                <label className="flex flex-col py-2">
                                                <span
                                                    className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                                                  Składający:
                                                </span>
                                                    <input type="text" name="offerer" value={offerer}
                                                           onChange={handleOffererChange}
                                                           className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                                                           required
                                                    />
                                                </label>
                                                <label className="flex flex-col py-2">
                                                <span
                                                    className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                                                  Wartość:
                                                </span>
                                                    <input type="number" name="value" value={value}
                                                           onChange={handleValueChange}
                                                           className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                                                           required
                                                    />
                                                    {valueError != "" &&
                                                        <p className="text-center font-bold text-red-600 mt-2">{valueError}</p>
                                                    }
                                                </label>
                                                <div className="flex flex-col justify-center items-center">
                                                    <button
                                                        type="submit"
                                                        className="mt-6 mb-3 px-12 py-2  transition hover:scale-110 delay-150 rounded-lg bg-amber-500
                                                               hover:bg-amber-700 hover:shadow-amber-700 text-white shadow-lg shadow-amber-500">
                                                        Złóż ofertę
                                                    </button>
                                                    {error != "" &&
                                                        <p className="text-center font-bold text-red-600 mt-2">{error}</p>
                                                    }
                                                    {info != "" &&
                                                        <p className="text-center font-bold text-green-600 mt-2">{info}</p>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </>

                                ) : (
                                    <div className="mx-auto">
                                        <p className="text-red-600 font-bold text-center">Przetarg nieaktywny</p>
                                    </div>
                                )}
                            </>)
                        : (
                            <div className="mx-auto">
                                <p className="text-red-600 font-bold text-center">{tenderError}</p>
                            </div>
                        )
                    }
                </div>

            )}
        </>
    )
}

export default ActiveTender