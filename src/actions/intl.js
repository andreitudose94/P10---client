/**
 * Created by Tudose Andrei on 02/12/2016.
 */
import moment from 'moment'
import { updateIntl } from 'react-intl-redux'

import translations from 'lib/translations'

/**
 * Set new locale => update translations
 *
 * @param {String} locale
 *
 */
export const setLocale = (locale) => {
  moment.locale(locale)
  dispatch(updateIntl(translations[locale]))
};
