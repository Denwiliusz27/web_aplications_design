import {Link} from "react-router-dom";

function HomePage() {
    return(
        <>
            <div className="w-2/5 mx-auto">
                <h1 className="text-center text-xl">Drogi użytkowniku!</h1>
                <div className="py-5 leading-relaxed">
                    <p> Strona
                        <Link to="/" className="underline underline-offset-4 px-2 decoration-2 decoration-amber-300 hover:decoration-amber-500 italic">Przetargi.pl</Link>
                         umożliwia ogłaszanie przetargów przez dowolną instytucję oraz wzięcie w nich udziału przez każdą osobę.
                    </p>
                    <br></br>
                    <p> W zakładce
                        <Link to="/aktywne" className="underline underline-offset-4 px-2 decoration-2 decoration-amber-300 hover:decoration-amber-500 italic">Aktywne przetargi</Link>
                        znajduje się lista aktualnie przeprowadzanych przetargów.</p>
                    <br></br>
                    <p> Zakładka
                        <Link to="/zakończone" className="underline underline-offset-4 px-2 decoration-2 decoration-amber-300 hover:decoration-amber-500 italic">Zakończone przetargi</Link>
                        pozwala przejrzeć przetargi, które zostały zakończone.</p>
                    <br></br>
                    <p> W zakładce
                        <Link to="/dodaj" className="underline underline-offset-4 px-2 decoration-2 decoration-amber-300 hover:decoration-amber-500 italic">Dodaj przetarg</Link>
                        możliwe jest utworzenie nowego przetargu po podaniu wymaganych informacji.</p>
                </div>
            </div>
        </>
    )
}

export default HomePage