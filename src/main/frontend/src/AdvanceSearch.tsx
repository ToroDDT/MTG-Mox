import { useReducer, useState } from "react";
import { Dialog, FormControl, Select, MenuItem, TextField, Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type State = {
  name: string;
  set: string;
  card_type: string;
  colors_identity: string;
  mana_value: number;
  power: number;
  toughness: number;
  relativePower: string;
  relativeToughness: string;
};

const ACTIONS = {
  SET_POWER: "setPower",
  SET_TOUGHNESS: "setToughness",
  SET_CARDNAME: "setCardName",
  SET_SET: "setSet",
  SET_CARD_TYPE: "cardType",
  SET_COLOR_IDENTITY: "colorIdentity",
  SET_MANA_VALUE: "manaValue",
  SET_RELATIVE_POWER: "relativePower",
  SET_RELATIVE_TOUGHNESS: "relativeToughness"
} as const;

type Action =
  | { type: typeof ACTIONS.SET_CARDNAME; payload: string }
  | { type: typeof ACTIONS.SET_SET; payload: string }
  | { type: typeof ACTIONS.SET_CARD_TYPE; payload: string }
  | { type: typeof ACTIONS.SET_COLOR_IDENTITY; payload: string }
  | { type: typeof ACTIONS.SET_POWER; payload: number }
  | { type: typeof ACTIONS.SET_TOUGHNESS; payload: number }
  | { type: typeof ACTIONS.SET_MANA_VALUE; payload: number }
  | { type: typeof ACTIONS.SET_RELATIVE_TOUGHNESS; payload: string }
  | { type: typeof ACTIONS.SET_RELATIVE_POWER; payload: string };



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
    case ACTIONS.SET_POWER:
      return { ...state, power: action.payload };
    case ACTIONS.SET_TOUGHNESS:
      return { ...state, toughness: action.payload };
    case ACTIONS.SET_RELATIVE_POWER:
      return { ...state, relativePower: action.payload };
    case ACTIONS.SET_RELATIVE_TOUGHNESS:
      return { ...state, relativeToughness: action.payload };
    default:
      return state;
  }
}

function AdvanceSearch() {

  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    relativePower: "Greater than",
    relativeToughness: "Equals to",
    set: "",
    card_type: "",
    colors_identity: "",
    mana_value: 0,
    power: 0,
    toughness: 0,
  });

  const [open, setOpen] = useState(false)
  async function sendForm() {
    console.log("Form Submitted");
    try {
      const response = await fetch("http://localhost:8080/advance-search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      console.log("Search results:", result.Data);
    } catch (error) {
      console.error("Failed to retrieve card data from advance search:", error);
    }
  }
  return (
    <>
      <Button sx={{
        border: 'none',
        width: 'fit-content',
        color: 'purple',     // Purple text
        fontSize: '0.7rem',  // Smaller text
        minWidth: 'auto',    // Let it shrink
        lineHeight: 1,
        textTransform: 'none' // Prevent all caps if undesired
      }} variant="outlined" onClick={() => setOpen(true)}>
        Advance Search
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogContent>
          <form action={sendForm}>
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
            <FormControl fullWidth>
              <Select
                labelId="Color-Identity"
                id="Color-Identity"
                value={state.colors_identity}
                label="power"
                className="mr-2"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.SET_COLOR_IDENTITY,
                    payload: String(e.target.value)
                  })
                }
              >
                //One Color
                <MenuItem value={"White"}>White</MenuItem>
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"Blue"}>Blue</MenuItem>
                <MenuItem value={"Green"}>Green</MenuItem>
                <MenuItem value={"Colorless"}>Colorless</MenuItem>

                //Two Color
                <MenuItem value={"Izzet"}>Izzet</MenuItem>
                <MenuItem value={"Golgari"}>Golgari</MenuItem>
                <MenuItem value={"Gruel"}>Gruel</MenuItem>
                <MenuItem value={"Boros"}>Boros</MenuItem>
                <MenuItem value={"Simic"}>Simic</MenuItem>
                <MenuItem value={"Rakdos"}>Rakdos</MenuItem>
                <MenuItem value={"Golgari"}>Golgari</MenuItem>
                <MenuItem value={"Selesyna"}>Selesyna</MenuItem>
                <MenuItem value={"Orzhov"}>Orzhov</MenuItem>
                <MenuItem value={"Dimir"}>Dimir</MenuItem>

                //Three Color
                <MenuItem value={"Abzan"}>Abzan</MenuItem>
                <MenuItem value={"Bant"}>Bant</MenuItem>
                <MenuItem value={"Esper"}>Esper</MenuItem>
                <MenuItem value={"Grixis"}>Grixis</MenuItem>
                <MenuItem value={"Jeskai"}>Jeskai</MenuItem>
                <MenuItem value={"Jund"}>Jund</MenuItem>
                <MenuItem value={"Mardu"}>Mardu</MenuItem>
                <MenuItem value={"Naya"}>Naya</MenuItem>
                <MenuItem value={"Sultai"}>Sultai</MenuItem>
                <MenuItem value={"Temur"}>Temur</MenuItem>

                //Four Color
                <MenuItem value={"Dune"}>Dune – WBRG (No Blue)</MenuItem>
                <MenuItem value={"Glint"}>Glint – UBRG (No White)</MenuItem>
                <MenuItem value={"Ink"}>Ink – WURG (No Black)</MenuItem>
                <MenuItem value={"Witch"}>Witch – WUBG (No Red)</MenuItem>
                <MenuItem value={"Yore"}>Yore – WUBR (No Green)</MenuItem>

                //Five Color
                <MenuItem value={"WUBRG"}>WooBerg</MenuItem>
              </Select>
            </FormControl>
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
            <div className="flex flex-row mt-4">
              <FormControl fullWidth>
                <Select
                  labelId="relative-power"
                  id="relative-power"
                  value={state.relativePower}
                  label="power"
                  className="mr-2"
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_RELATIVE_POWER,
                      payload: String(e.target.value)
                    })
                  }
                >
                  <MenuItem value={"Greater than"}>Greater Than</MenuItem>
                  <MenuItem value={"Equals to"}>Equals To </MenuItem>
                  <MenuItem value={"Less Than"}>Less Than</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Power"
                type="string"
                value={state.power}
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.SET_POWER,
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-row mt-4">
              <FormControl fullWidth>
                <Select
                  labelId="relative-toughness"
                  id="relative-toughness"
                  value={state.relativeToughness}
                  label="toughness"
                  className="mr-2"
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_RELATIVE_TOUGHNESS,
                      payload: String(e.target.value)
                    })
                  }
                >
                  <MenuItem value={"Greater than"}>Greater Than</MenuItem>
                  <MenuItem value={"Equals to"}>Equals To </MenuItem>
                  <MenuItem value={"Less than"}>Less Than</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Toughness"
                type="string"
                value={state.toughness}
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.SET_RELATIVE_TOUGHNESS,
                    payload: String(e.target.value),
                  })
                }
              />
            </div>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" onClick={() => setOpen(false)}>
                Search
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default AdvanceSearch;
