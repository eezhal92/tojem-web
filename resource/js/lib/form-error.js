const init = () => Object.create(null);

class FormError {
  /**
   * Create a new Errors instances
   *
   * @param  {Object} object
   * @return {Object}
   */
  constructor(object) {
    this._store = Object.assign(init(), object || {}, this._store);
  }

  /**
   * Add or set 'collections'
   *
   * @param  {String|Object} field
   * @param  {any}           value
   * @return {void}
   */
  set(field, value) {
    if (typeof field === 'object') {
      this._store = field;
    } else {
      this._store[field] = value;
    }
  }

  /**
   * Get the size of errors 'collections'
   *
   * @return {Number}
   */
  size() {
    return Object.keys(this._store).length;
  }

  /**
   * Check if the 'collections' has 'property'
   *
   * @param  {String}  field
   * @return {Boolean}
   */
  has(field) {
    return field in this._store;
  }

  /**
   * Get the property value
   *
   * @param  {String} field
   * @return {any}
   */
  get(field) {
    if (this.has(field)) {
      return Array.isArray(this._store[field])
        ? this._store[field][0]
        : this._store[field];
    }

    return null;
  }

  /**
   * Delete the 'collections' property
   *
   * @param  {String} field
   * @return {void}
   */
  delete(field) {
    if (this.has(field)) {
      delete this._store[field];
    }
  }

  /**
   * Clear and reset 'errors' collections
   *
   * @return {void}
   */
  clear() {
    this._store = init();
  }
}

export default FormError;
