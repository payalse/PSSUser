import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DropDown } from '@project-types/index';             

interface DropDownType {
  courseTypes: DropDown[];
  genderIdentity: DropDown[];
  racialIdentity: DropDown[];
  sexualOrientation: DropDown[];
  faith: DropDown[];
  whoAreYou: DropDown[];
}

const initialState: DropDownType = {
  courseTypes: [],
  genderIdentity: [],
  racialIdentity: [],
  sexualOrientation: [],
  faith: [],
  whoAreYou: [],
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    addDropDownItem: (state: any, action: PayloadAction<Partial<DropDown>>) => {
      const payload: any = action.payload;
      if (payload && payload?.length) {

        state.courseTypes = payload.filter((event: any) => event.type == 0);
        state.genderIdentity = payload.filter((event: any) => event.type == 1);
        state.racialIdentity = payload.filter((event: any) => event.type == 2);
        state.sexualOrientation = payload.filter(
          (event: any) => event.type == 3,
        );
        state.faith = payload.filter((event: any) => event.type == 4);
        state.whoAreYou = payload.filter((event: any) => event.type == 5);
      }
    },
  },
});

export const { addDropDownItem } = dropdownSlice.actions;
export default dropdownSlice.reducer;
