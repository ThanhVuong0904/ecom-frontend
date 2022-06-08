export const productReducer = (state, action) => {
     const {type, payload} = action
     switch(type) {
          case 'GET_PRODUCT':
               return {
                    ...state,
                    products: payload
               }
          case 'GET_BEST_SELLER':
               return {
                    ...state,
                    bestSeller: payload
               }
          case 'GET_SIMILAR':
               return {
                    ...state,
                    similar: payload
               }
          default:
               return state
     }
}
