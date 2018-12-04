/* eslint-disable no-console */
import {BehaviorSubject} from 'rxjs'
import {first, map} from 'rxjs/operators'
import {ALL_CATEGORY_TYPES} from '../report/reportConstants'
import categoryService from './categoryService'

class CategoryStoreAsync {
  constructor () {
    this.observables = {}
    for (const categoryType of ALL_CATEGORY_TYPES) {
      this[`${categoryType}Observable`] = new BehaviorSubject({isLoaded: false, isLoading: false, data: []})
      this.observables[categoryType] = () => {
        return this[`${categoryType}Observable`]
      }
    }
  }

  getCategoryOptions (categoryType) {
    if (!ALL_CATEGORY_TYPES.includes(categoryType)) {
      throw new Error(`categoryStore getCategoryOptions can not get an unknown category type of ${categoryType}`)
    }

    if (!(this.observables[categoryType]().getValue().isLoading || this.observables[categoryType]().getValue().isLoaded)) {
      this.observables[categoryType]().next({
        ...this.observables[categoryType]().getValue(),
        isLoading: true
      })

      return categoryService.getCategory(categoryType)
        .then((response) => {
          this.observables[categoryType]().next({
            isLoading: false,
            isLoaded: true,
            data: response
          })
          return response
        })
    }
    return (
      this.observables[categoryType]()
        .pipe(
          first(),
          map(res => res.data)
        )
        .toPromise()
    )
  }
}

export default new CategoryStoreAsync()
