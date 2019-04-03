import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

const initializeFontAwesomeIcons = () => {
  library.add(icons.faIgloo)
  library.add(icons.faCamera)
  library.add(icons.faPlusCircle)
  library.add(icons.faCheckCircle)
  library.add(icons.faTimes)
  library.add(icons.faTimesCircle)
  console.log('icons', icons)
}

export default initializeFontAwesomeIcons
