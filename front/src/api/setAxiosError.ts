import {enqueueSnackbar} from "notistack"

const setAxiosError = (error: any, logout: any) => {
    if (error?.response.status === 401) {
        logout()
    }
    enqueueSnackbar(`${error?.response.data.message}`)
}

export default setAxiosError