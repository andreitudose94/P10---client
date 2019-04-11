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
  library.add(icons.faHeadset)
  library.add(icons.faHeadphones)
  library.add(icons.faCalendarCheck)
  library.add(icons.faClock)
  library.add(icons.faUserCheck)
  library.add(icons.faMapMarkedAlt)
  library.add(icons.faLocationArrow)
  library.add(icons.faCommentAlt)
  library.add(icons.faPhone)
  library.add(icons.faUsers)
  library.add(icons.faMap)
  library.add(icons.faUser)
  library.add(icons.faExclamationTriangle)
  library.add(icons.faListOl)
  library.add(icons.faKey)
  library.add(icons.faBuilding)
  library.add(icons.faSuitcase)
  // library.add(icons.faMapMarkedAlt)
  // library.add(icons.faMapMarkedAlt)
  console.log('icons', icons)
}

export default initializeFontAwesomeIcons
