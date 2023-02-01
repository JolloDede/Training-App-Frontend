interface Props {
    children: React.ReactNode;
}

function SecondTitle({ children }: Props) {
    return (
        <h1 className='text-2xl font-bold'>{children}</h1>
    )
}

export default SecondTitle;