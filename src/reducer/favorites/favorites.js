import { api } from "../../api";
import { extend, removeHotelFromFavorites } from "../../utils";

const initialState = {
  favorites: []
};

const ActionType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  TOGGLE_IS_FAVORITE: `TOGGLE_IS_FAVORITE`,
  ADD_IN_FAVORITES: `ADD_IN_FAVORITES`,
  REMOVE_FROM_FAVORITES: `REMOVE_FROM_FAVORITES`
};

const ActionCreator = {
  loadFavorites(favorites) {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites
    }
  },

  addInFavorites(hotel) {
    return {
      type: ActionType.ADD_IN_FAVORITES,
      payload: hotel
    }
  },

  removeFromFavorites(id) {
    return {
      type: ActionType.REMOVE_FROM_FAVORITES,
      payload: id
    }
  }
};

const Operation = {
  loadFavorites: () => {
    return async (dispatch) => {
      const favorites = await api.getFavorites();
      dispatch(ActionCreator.loadFavorites(favorites));
    }
  },

  toggleIsFavorite: (id, status) => {
    return async (dispatch) => {
      const hotel = await api.toggleFavoriteStatus(id, status);

      if (status) {
        dispatch(ActionCreator.addInFavorites(hotel));
      } else {
        dispatch(ActionCreator.removeFromFavorites(id));
      }
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload
      })

    case ActionType.ADD_IN_FAVORITES:
      return extend(state, {
        favorites: [...state.favorites, action.payload]
      })

    case ActionType.REMOVE_FROM_FAVORITES:
      return extend(state, {
        favorites: removeHotelFromFavorites([...state.favorites], action.payload)
      })

    default:
      return state;
  }
};

export {
  ActionCreator,
  Operation,
  reducer
}