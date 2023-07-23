import {useState} from "react";
import moment from "moment";
import {useMutation} from "react-query";
import Api from "../Api";

function NewTender() {
    const [title, setTitle] = useState("")
    const [contracting_authority, setContractingAuthority] = useState("")
    const [maxValue, setMaxValue] = useState(0)
    const [startDate, setStartDate] = useState<Date>(null)
    const [endDate, setEndDate] = useState<Date>(null)
    const [description, setDescription] = useState("")
    const [valueError, setValueError] = useState("")
    const [error, setError] = useState("")
    const [dateError, setDateError] = useState("")
    const [info, setInfo] = useState("")

    const createTender = useMutation({
        mutationFn: async () => {
            return await Api.post(`przetargi/dodaj`, {
                title: title,
                contracting_authority: contracting_authority,
                start_date: startDate,
                end_date: endDate,
                max_value: maxValue,
                description: description
            }).then((res) => res.data)
                .catch(() => {
                    setError("Błąd przy próbie tworzenia przetargu")
                });
        },
        onError() {
            setError("Nie udało się utworzyć przetargu");
        },
        onSuccess() {
            setInfo("Pomyślnie dodano przetarg")
            setTitle("")
            setContractingAuthority("")
            setStartDate(null)
            setEndDate(null)
            setMaxValue(0)
            setDescription("")
        }
    });

    const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInfo("")
        setTitle(event.currentTarget.value)
    }

    const handleAuthorityChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInfo("")
        setContractingAuthority(event.currentTarget.value)
    }

    const handleStartDateChange = (e) => {
        setInfo("")
        setDateError("")
        setStartDate(new Date(e.target.value))
    }

    const handleEndDateChange = (e) => {
        setInfo("")
        setDateError("")
        setEndDate(new Date(e.target.value))
    }

    const handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (isNaN(event.currentTarget.value)) {
            setMaxValue(0)
        } else {
            setMaxValue(parseInt(event.currentTarget.value));
        }
        setInfo("")
        setValueError("")
    }

    const handleDescriptionChange = (e) => {
        setInfo("")
        setDescription(e.target.value)
    }

    const addNewTender = (e) => {
        e.preventDefault()
        const now = new Date()
        let error = false

        if (startDate > endDate) {
            setDateError("Data rozpoczęcia nie może być późniejsza niż data zakończenia")
            error = true
        } else if (startDate < now || endDate < now) {
            setDateError("Data rozpoczęcia i zakończenia nie może być datą przeszłą")
            error = true
        }

        if (maxValue <= 0) {
            setValueError("Maksymalna wartość powinna być wartością dodatnią")
            error = true
        }

        if (!error) {
            createTender.mutate()
        } else {
            return
        }
    }


    return (
        <>
            <h1 className="text-center text-xl font-bold pb-10">Dodaj przetarg</h1>
            <form onSubmit={addNewTender} className="flex flex-col w-1/3 mx-auto pb-6">
                <label className="flex flex-col py-2">
                    <span
                        className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                      Tytuł
                    </span>
                    <input type="text" name="title" value={title} onChange={handleTitleChange}
                           placeholder="Wprowadź tytuł"
                           className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                           required
                    />
                </label>
                <label className="flex flex-col py-2">
                    <span
                        className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                      Instytucja zamawiająca
                    </span>
                    <input type="text" name="contracting_authority" value={contracting_authority}
                           onChange={handleAuthorityChange} placeholder="Wprowadź nazwę instytucji"
                           className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                           required
                    />
                </label>

                <div className="flex flex-row">
                    <label className="flex flex-col py-2 basis-1/2 pr-2">
                    <span
                        className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                      Data rozpoczęcia
                    </span>
                        <input type="datetime-local" value={moment(startDate).format("YYYY-MM-DDTkk:mm")}
                               onChange={handleStartDateChange}
                               className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                               required/>
                    </label>
                    <label className="flex flex-col py-2 basis-1/2 pl-2">
                    <span
                        className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                      Data zakończenia
                    </span>
                        <input type="datetime-local" value={moment(endDate).format("YYYY-MM-DDTkk:mm")}
                               onChange={handleEndDateChange}
                               className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                               required/>
                    </label>
                </div>
                {dateError != "" &&
                    <p className="text-center font-bold text-red-600 mt-2">{dateError}</p>
                }

                <label className="flex flex-col py-2">
                    <span
                        className="flex py-2 after:content-['*'] after:text-red-600 font-bold">
                      Maksymalna wartość
                    </span>
                    <input type="number" name="value" value={maxValue} onChange={handleValueChange}
                           className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                           required
                    />
                    {valueError != "" &&
                        <p className="text-center font-bold text-red-600 mt-2">{valueError}</p>
                    }
                </label>
                <label className="flex flex-col py-2">
                    <span
                        className="flex py-2 after:text-red-600 font-bold">
                      Opis
                    </span>
                    <textarea name="title" value={description} onChange={handleDescriptionChange}
                              placeholder="Wprowadź opis"
                              className="py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"/>
                </label>

                <div className="flex flex-col justify-center items-center">
                    <button
                        type="submit"
                        className="mt-6 mb-3 px-12 py-2  transition hover:scale-110 delay-150 rounded-lg bg-amber-500
                                                               hover:bg-amber-700 hover:shadow-amber-700 text-white shadow-lg shadow-amber-500">
                        Dodaj przetarg
                    </button>
                    {error != "" &&
                        <p className="text-center font-bold text-red-600 mt-2">{error}</p>
                    }
                    {info != "" &&
                        <p className="text-center font-bold text-green-600 mt-2">{info}</p>
                    }
                </div>
            </form>
        </>
    )
}

export default NewTender