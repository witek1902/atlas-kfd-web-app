import { sections } from './data/sections'
import { section } from './data/section'
import { exercise } from './data/exercise'
import { exercises } from './data/exercises'
const ULR_MAPPING = [
  {
    urlRe: /sections\/\+?\d+/g,
    data: section
  },
  {
    urlRe: /sections/g,
    data: sections
  },
  {
    urlRe: /exercises\/\+?\d+/g,
    data: exercise
  },
  {
    urlRe: /exercises/g,
    data: exercises
  },
]

function urlReMatch (urlMappingObj, url) {
  return urlMappingObj.urlRe.test(url)
}

function getUrlData (method, url, data) {
  if (method === 'get') {
    let mockData = null
    for (let mapping of ULR_MAPPING) {
      if (urlReMatch(mapping, url)) {
        console.log('got url match')
        return Promise.resolve({
          status: 200,
          data: mapping.data
        })
      }
    }
    return Promise.reject({error: 'No matching url found'})
  }
    
  if (method === 'delete') {
    return Promise.resolve({
      status: 200
    })
  }
    
  if (method === 'post' && url === 'sections') {
    data.id = Math.floor(Math.random() * Math.floor(999))
    return Promise.resolve({
      status: 200,
      data: data
    })
  }
    
  if (method === 'post') {
    return Promise.resolve({
      status: 200
    })
  }
}

export const mock = {
  get (url) {
    return getUrlData('get', url)
  },
  post (url, data) {
    return getUrlData('post', url, data)
  },
  delete (url) {
    return getUrlData('delete')
  }
}
