import Icon from '../icons/base'
import {AddProps} from '@/lib/highOrderComponents'

const NoteBarIcon = Icon.extend`
  &:hover #palette {
    opacity: 1;
  }
`
export default AddProps(NoteBarIcon)({dataID: 'newNote'})