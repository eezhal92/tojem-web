class Collections extends Map {
  keys() {
    return Array.from(super.keys());
  }
}

module.exports = new Collections();
