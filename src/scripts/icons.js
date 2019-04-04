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
  library.add(icons.faCog)
  library.add(icons.faSignOutAlt)
  library.add(icons.faHome)
  library.add(icons.faBars)
  library.add(icons.faUserCircle)
  library.add(icons.faDatabase)
  console.log('icons', icons)
}

export default initializeFontAwesomeIcons
