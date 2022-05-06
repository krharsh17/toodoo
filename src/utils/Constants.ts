export const GREY="#F0F0F0"
export const WHITE="#FFFFFF"
export const BLACK="#2B2D42"
export const YELLOW="#F7EC59"
export const PINK="#FF66D8"
export const BLUE="#92DCE5"

export const EMPTY_STRING=""

export const PAGE_HORIZONTAL_PADDING="32px"

export const ROUTE_HOME="/"
export const ROUTE_LOGIN="/login"

export const APP_NAME="TooDoo"

export const TITLE_VIEW_OPTIONS="View Options"
export const TITLE_LOGOUT="Logout"
export const TITLE_LOGIN="Log in!"
export const TITLE_SIGN_IN="Sign In"
export const TITLE_LIST="Your To-Do List"
export const TITLE_EDIT="Edit"
export const TITLE_SAVE="Save"
export const TITLE_CLOSE="Close"
export const TITLE_DELETE="Delete"

export const SEVERITY_INFO="info"
export const SEVERITY_SUCCESS="success"
export const SEVERITY_ERROR="error"

export const ALERT_CHANGES_NOT_SAVED="Changes were not saved."
export const ALERT_CHANGES_SAVED="Saved!"
export const ALERT_ENTER_TITLE="Please enter a title."
export const ALERT_EMPTY="Looks empty... Click on the + icon below to get started!"
export const ALERT_SOMETHING_WENT_WRONG="Something went wrong"
export const ALERT_WEAK_PASSWORD="Password should be at least 6 characters long"
export const ALERT_CREATING_USER="Creating new user"
export const ALERT_WRONG_PASSWORD="Wrong password. Please try again"
export const ALERT_MISSING_EMAIL="Please enter email"
export const ALERT_BAD_EMAIL="Please enter a proper email address"
export const ALERT_MISSING_PASSWORD="Please enter password"
export const ALERT_SIGNED_IN="Signed In!"

export const DUE_DATE_FORMAT="DD/MM/yyyy"

export const LABEL_DUE_DATE="Due Date"
export const LABEL_TITLE="Title"
export const LABEL_PASSWORD="Password"
export const LABEL_EMAIL="Email"

export const ARIA_LABEL_EDIT="edit"
export const ARIA_LABEL_SAVE="save"
export const ARIA_LABEL_DELETE="delete"
export const ARIA_LABEL_CLOSE="close"

export const TEST_ID_EDIT="EditToDoIcon"
export const TEST_ID_SAVE="SaveToDoIcon"
export const TEST_ID_DELETE="DeleteToDoIcon"
export const TEST_ID_CLOSE="CloseToDoIcon"
export const TEST_ID_ADD="AddToDoIcon"
export const TEST_ID_TITLE="ToDoTitle"
export const TEST_ID_DUE_DATE="ToDoDueDate"
export const TEST_ID_TITLE_FIELD="ToDoTitleField"
export const TEST_ID_DUE_DATE_FIELD="ToDoDueDateField"

export const FIREBASE_ERROR_WRONG_PASSWORD="auth/wrong-password"
export const FIREBASE_ERROR_USER_NOT_FOUND="auth/user-not-found"
export const FIREBASE_ERROR_WEAK_PASSWORD="auth/weak-password"

export const DUE_DATE_TEMPLATE = (date?: string) => date ? `Due by ${date}` : EMPTY_STRING