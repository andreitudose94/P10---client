import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faCamera } from '@fortawesome/free-solid-svg-icons'

const initializeFontAwesomeIcons = () => {
  library.add(faIgloo)
  library.add(faCamera)
}

export default initializeFontAwesomeIcons
