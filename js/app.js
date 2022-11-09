// Constans
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const ADD_MONEY = "ADD_MONEY";
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

//Action Creator
const withdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

//Action Creator
const add = (amount) => {
  return {
    type: ADD_MONEY,
    payload: amount,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

// IMPORTANT
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

//Fetch Data
const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
    dispatch(getProducts(data));
  };
};

//Reducers
const bankReducer = (state = 0, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;
    case ADD_MONEY:
      return state + action.payload;
    default:
      return state;
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, ...action.payload];
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

//combine Reducers
const appReducer = Redux.combineReducers({
  bank: bankReducer,
  products: productsReducer,
});

//Store
const store = Redux.createStore(appReducer, Redux.applyMiddleware(ReduxThunk));


let amountInput = document.querySelector("#amount");
let amountValue = document.querySelector("#value");

amountValue.innerHTML = store.getState().bank;

document.querySelector("#add").addEventListener("click", () => {
  store.dispatch(add(+amountInput.value));
  amountInput.value = "";
});

document.querySelector("#withdraw").addEventListener("click", () => {
  store.dispatch(withdraw(+amountInput.value));
  amountInput.value = "";
});

store.subscribe(() => {
  console.log(store.getState());
  amountValue.innerHTML = store.getState().bank;
});

