import { useReducer, useState } from "react";
import { Dialog, TextField, Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type State = {
  name: string;
  set: string;
  card_type: string;
  colors_identity: string[];
  mana_value: number;
};

const ACTIONS = {
  SET_POWER: "setPower",
  SET_TOUGHNESS: "setToughness",
  SET_CARDNAME: "setCardName",
  SET_SET: "setSet",
  SET_CARD_TYPE: "cardType",
  SET_COLOR_IDENTITY: "colorIdentity",
  SET_MANA_VALUE: "manaValue"
} as const;

type Action =
  | { type: typeof ACTIONS.SET_CARDNAME; payload: string }
  | { type: typeof ACTIONS.SET_SET; payload: string }
  | { type: typeof ACTIONS.SET_CARD_TYPE; payload: string }
  | { type: typeof ACTIONS.SET_COLOR_IDENTITY; payload: string[] }
  | { type: typeof ACTIONS.SET_MANA_VALUE; payload: number };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_CARDNAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_SET:
      return { ...state, set: action.payload };
    case ACTIONS.SET_CARD_TYPE:
      return { ...state, card_type: action.payload };
    case ACTIONS.SET_COLOR_IDENTITY:
      return { ...state, colors_identity: action.payload };
    case ACTIONS.SET_MANA_VALUE:
      return { ...state, mana_value: action.payload };
    default:
      return state;
  }
}

function AdvanceSearch() {

  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    set: "",
    card_type: "",
    colors_identity: [],
    mana_value: 0,
  });

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Search Modal
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Card Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: ACTIONS.SET_CARDNAME, payload: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Set"
            value={state.set}
            onChange={(e) =>
              dispatch({ type: ACTIONS.SET_SET, payload: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Card Type"
            value={state.card_type}
            onChange={(e) =>
              dispatch({ type: ACTIONS.SET_CARD_TYPE, payload: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Color Identity (comma separated)"
            value={state.colors_identity.join(',')}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_COLOR_IDENTITY,
                payload: e.target.value.split(','),
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mana Value"
            type="number"
            value={state.mana_value}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_MANA_VALUE,
                payload: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default AdvanceSearch;
