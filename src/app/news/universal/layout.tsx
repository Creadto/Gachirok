interface props{
    children : React.ReactNode;
    modal:React.ReactNode;
}



export default function NewsLayout({children,modal} : props){

    return(
        <>
            {children}
            {modal}
        </>
    );

}