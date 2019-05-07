import convert from 'xml-js'

export const config = {
  headers: {
    Accept: 'application/xml'
  }
}

export const fetchData = data =>
  JSON.parse(convert.xml2json(data, { compact: true, trim: true, spaces: 2 }))

export const remapSongs = songs =>
  songs.map(s => ({
    id: s._text,
    artist: s._attributes.artist,
    title: s._attributes.name
  }))
