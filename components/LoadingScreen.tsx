import ReactLoading from 'react-loading'

export const LoadingScreen = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-10 flex justify-center items-center">
            <ReactLoading type='spin' color='#2454DE' height={100} width={100} />
        </div>
    )
}