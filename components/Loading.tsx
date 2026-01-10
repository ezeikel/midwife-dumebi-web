import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-section-alt">
      <div className="text-center">
        <FontAwesomeIcon
          icon={faSpinnerThird}
          spin
          className="text-rose text-4xl mb-4"
        />
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
