import event from './events'
import Immutable, {is} from 'immutable'
import {ADD_TAG, REMOVE_TAG} from '../static/javascript/constants'

export function getNewNotesAfterEditTag(tagName, chosenNotes, operate = REMOVE_TAG) {
  if (operate === REMOVE_TAG) {
    return chosenNotes.map(note => {
      if (note.lable.findIndex(v => v.text === tagName) > -1) {
        const newLable = note.lable.filter(v => v.text !== tagName)
        return {...note, lable: newLable}
      }
      return note
    })
  } else if (operate === ADD_TAG) {
    return chosenNotes.map(note => {
      if (note.lable.findIndex(v => v.text === tagName) < 0) {
        const newLable = [...note.lable, {text: tagName}]
        return {...note, lable: newLable}
      }
      return note
    })
  } else {
    return chosenNotes
  }
}
export function getNotesNeedToRecalc(prevNotes, nextNotes) {
  const notesNeedCalc = []
  nextNotes.forEach((newNote, index) => {
    if (newNote.lable.length !== prevNotes[index].lable.length) {
      notesNeedCalc.push(newNote)
    }
  })
  return notesNeedCalc
}

/* 
 * @param {Object} notes the notes need to recalc height
 * @returns {Object} Promise
 */
export function recalcHeight(notes) {
  return new Promise((resolve) => {
    event.emitEvent('computeCardHeight', notes, resolve)
  })
}

export function add(m, n) {
  return m + n
}
export function equal(a, b) {
  const x = Immutable.fromJS(a),
    y = Immutable.fromJS(b)
  return is(x, y)
}
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
export function regular(num, len = 2) {
  if (num.toString().length < len) {
    const timesOf0 = len - num.toString().length,
      addon = (Math.pow(10, timesOf0)).toString().slice(1)
    return addon + num
  }
  return num
}