import { CircleLoader, ClipLoader, FadeLoader, PuffLoader } from 'react-spinners'


const Loader = () => {
    const  color = "#4E4F50";
  return (
    <div>
        <CircleLoader
        color={color}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader