interface props{
    children : React.ReactNode;
    modal:React.ReactNode;
}

export default function PaymentLayout({children,modal} : props) {


    return(
        <>
            {children}
            {modal}
        </>
    );

}