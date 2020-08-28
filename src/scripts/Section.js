export default class Section {
  constructor ({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = containerSelector
  }

  renderer(items) {
    items.reverse().forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item) {
    this._container.prepend(item)
  }
}