# Color Workspace Builder Specifications

## Overview

A mini-app called "Color Workspace Builder" that allows users to create and manage a color palette workspace. This tool is commonly used in theme configuration.

## Provided Resources

- **Color palettes**: Refer to the `public/combinations.json` file for pre-built color palettes. Select 7 of them.
- **Favicon**: Refer to the `public/workspace-builder.png`.

## Detail Design & Function Spec

Based on the UI/UX design, from top to bottom:

### Header Section

- Heading showing favicon and title "Color Workspace Builder".

### Palettes Section

- Label "Loaded 7 palettes" should be reactive based on loaded pre-built palettes count.
- Layout should be ordered as 4 columns grid containing 7 palettes.
- Each palette is rendered in a panel showing name and 4 selectable color swatches.
- Clicking on any color swatch will add that color into the workspace below.
- Should have hovering effect.

### Main Color Workspace Builder Section

#### Heading Row

- Title "Color Workspace Builder" aligned left.
- "Dark Mode" checkbox aligned right.
- Changing "Dark Mode" checkbox will only toggle dark mode theme for the live code editor theme preview below (using the native browser CSS styles).

#### Theme Row

- "Select Theme" dropdown aligned left.
- Theme action buttons including "Save Theme", "🗑" aligned right.

**Dropdown behavior:**

- Populated with default themes as well as custom saved themes in localStorage.
- Create the 3 default themes (Dracula / One Dark / VSCode theme) with colors of your choice as static config.
- Default themes are not deletable, while custom saved themes can be deleted.
- On changed: load selected theme including its color swatches, and apply reactive changes to the live code preview and workspace below.
- If the loaded theme is a custom saved theme, shows the "🗑" button on the right.

**"Save Theme" button:**

Clicking the button will show the "Save Custom Theme" modal form with the current color swatches in the workspace loaded. The color swatches ordering will be used to determine their types as follows: `["Key", "Func", "String", "Number", "Comment", "Tag"]`.

The modal form UI/UX design should follow `public/design-mockup-save-theme.png` as close as possible. The form elements from top to bottom:

1. **Heading**: "Save Custom Theme"
2. **Text Input Field**: required, label: "Enter a name for your theme \*", placeholder: "Theme name".
3. **Color swatches section**: 2 columns grid layout containing 6 color swatches. Each color swatch has:
   - Type name label (such as "Key:") aligned left
   - Color pill aligned right
   - The type name label is derived from the color swatch ordering position as mentioned earlier
   - The color pill should show: the hex color code as black-colored label on top of the color-coded background
   - Clicking on the color pill will display a color-picker widget (should be a Vue supported library, or fallback to native) to manually edit that color value
4. **Form footer**: HR divider line, then the 2 form action buttons "Cancel" and "Save" aligned right.
   - Clicking "Cancel" will just close the form modal.
   - Clicking "Save" will: save the theme into localStorage, close the form modal, populate the new theme into the dropdown and select it, as well as trigger onload event to apply the theme to the current workspace.
   - "Save" button is only enabled when the name input has value.

**"🗑" button (Delete Button):**

Only shows when the selected theme is a saved custom theme from localStorage. Clicking the button will show the form modal with the elements:

1. **Heading**: in the format: "Delete theme "${Saved Custom Theme Name}"?"
2. **Content text**: "Are you sure you want to delete this theme? This action cannot be undone."
3. **Footer button actions**: aligned right: "Cancel" and "Confirm".
   - "Cancel" will just close the modal.
   - "Confirm" will delete the current custom theme from localStorage, and close the modal. The workspace will revert to the initial empty state.

#### Live Code Editor Theme Preview

An emphasized panel representing a code editor of a Vue component file.

- Small heading showing a sample file name: "my-theme-preview.vue"
- The content is a properly formatted Vue component code with:
  1. Syntax colored highlight: reactive changes based on the current workspace color swatches below
  2. Properly indented formatting
  3. Code-style font-family
  4. The content code is:

```javascript
Vue.component('builder', {
  setup() {
    const count = ref(6);
    // comment
    <div>
  }
})
```

#### Workspace Color Swatches Section

- **Helper label**: "Drag to reorder colors or click to remove"
- **Color swatches list**: Showing current selected colors in the workspace.
  - Each color is shown as a rounded box with its own colored background.
  - Maximum of 6 colors.
  - Clicking on color swatches at the top palettes list will add that color to the end of the list.
  - Selecting a theme from dropdown will change the list to the selected theme colors.
  - Reorder colors using drag-and-drop feature (using Vue support library, or fallback to native).
  - The ordering will be used to define the color types later when saving custom theme.
  - Clicking on the small "x" button at the top right of the color will remove it from the list.
  - **Hover effects**:
    - Hovering on the color will show a white 1px border on the color box, and change cursor to pointer.
    - Hovering on the color "x" button will show a white 1px border on the "x" button, and change cursor to pointer.
  - **Low contrast warning**: If any color has low contrast according to the WCAG AA threshold (3.5), always shows a yellow 1px border on the color box as well as a small yellow warning character "⚠" at the bottom left.
- **Warning banner**: Shows at the bottom when any of the current colors in the list has low contrast.
  - Yellow styled colors tint for border, background, and text.
  - Text content: "⚠ Warning: Some colors have low contrast (<3.5)"

---

## UI Requirements Checklist

- [ ] A palette of selectable color swatches.
- [ ] A workspace area that uses the selected colors to configure the simple coding theme.

**Users should be able to:**

- [ ] Add/Reorder/Remove colors from the palette to the workspace.
- [ ] View the colors' hex code.
- [ ] Responsive layout and usable on both desktop and tablet (desktop-first).
- [ ] Select theme from the selector (e.g. switch code preview to Dracula / One Dark / VSCode theme…).
- [ ] Add/delete new custom themes.
- [ ] Support a separate Dark/Light mode toggle switch that applies for any themes.

## Functionality Checklist

- [ ] State management via Pinia.
- [ ] Reordering: if possible should be implemented with Vue-supported 3rd party library drag-and-drop solution. Or just fallback to native.
- [ ] Compute and show contrast ratio between color pairs.
- [ ] Warn the user with minimal label if contrast is below WCAG AA threshold (3.5).
- [ ] Live code preview box that reflects the workspace colors, styled as a simple mockup Vue SFC code template.
- [ ] Cache the selected colors for future visits.
- [ ] Cache the newly added themes for future visits.

## Technical Notes

- Technical stack should be purely VueJS ecosystem: VueJS 3, Pinia...
- Code should be modular, clean and readable.
- Proper usage of props, events, and component lifecycle is encouraged.

## Evaluation Criteria

- Component structure and separation of concerns
- State management practices
- UX responsiveness and accessibility awareness
- Cleanliness and modularity of codebase
