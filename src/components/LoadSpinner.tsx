
function LoadSpinner() {
    return (
        <div className="absolute w-full top-0 left-0 h-full bg-gray-500 bg-opacity-25">
            <div className="absolute top-1/2 left-1/2">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
            </div>
        </div>
    );
}

export default LoadSpinner;