import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [], // Danh sách các sản phẩm trong giỏ hàng
};

const TAX_RATE = 0.1; // Tỷ lệ thuế là 10%

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.items.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case actionTypes.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        items: [],
      };

    case actionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.payload ? { ...x, quantity: x.quantity + 1 } : x
        ),
      };

    case actionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.payload && x.quantity > 1
            ? { ...x, quantity: x.quantity - 1 }
            : x
        ),
      };

    default:
      return state;
  }
};

// Hàm tính tổng giá tiền tạm tính của giỏ hàng
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// Hàm tính tổng tiền thanh toán (bao gồm cả thuế 10%)
export const calculateTotal = (items) => {
  const subtotal = calculateSubtotal(items);
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;
  return total;
};

export default cartReducer;
