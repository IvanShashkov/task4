import {RouterProvider} from 'react-router-dom'
import {SnackbarProvider} from "notistack"
import {Provider} from "react-redux"
import router from "./router"
import store from "./store/store"
function App() {
  return (
      <SnackbarProvider
          autoHideDuration={4000}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
      >
          <Provider store={store}>
              <RouterProvider router={router} />
          </Provider>
      </SnackbarProvider>
  )
}

export default App
