Object.defineProperties(Array.prototype, {
  binarySearch: {
    value: function (target, l = 0, comparator = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
      var h = this.length - 1, m, comparison

      while (l <= h) {
        m = (l + h) >>> 1
        comparison = comparator(this[m], target)
        if (comparison < 0) {
          l = m + 1
        } else if (comparison > 0) {
          h = m - 1
        } else {
          return m
        }
      }
      return ~l
    },
  },
  binaryInsert: {
    value: function (target, duplicate, comparator) {
      var i = this.binarySearch(target, 0, comparator)
      if (i >= 0) {
        if (!duplicate) {
          return i
        }
      } else {
        i = ~i
      }
      this.splice(i, 0, target)
      return i
    },
  },
})

