import { createSelector } from "@ngrx/store";
import { getTodosState } from "./feature.selector";

export const getListingState = createSelector(getTodosState,state => state.listings)

export const getLabel = createSelector(getListingState,state => state.label)

export const getLoading = createSelector(getListingState,state => state.loading)

export const getLoaded = createSelector(getListingState,state => state.loaded)

export const getError = createSelector(getListingState,state => state.error)

export const getListings = createSelector(getListingState, state => [...state.listings].sort((a,b) => {
    const firstTitle = a.title.toLowerCase()
    const secondTitle = b.title.toLowerCase()
    if (firstTitle < secondTitle){
        return -1;
    }
    return 1;
}))

export const getActiveListing = createSelector(getListingState, state => state.activeListing)

export const getInViewMode = createSelector(getActiveListing,listing => listing?.inViewMode)

export const getSearchKeyWord = createSelector(getListingState,state => state.keyword)