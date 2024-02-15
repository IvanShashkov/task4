import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {NavigateFunction} from "react-router-dom"
import httpClient from "../api/httpClient"
import api from "../api/api"
import setAxiosError from "../api/setAxiosError"

export const jwtTokenLocalStorage = 'localStorageJwt'

export const userInit = createAsyncThunk('initial/csrfInit', async function ({ navigate, logout }: { navigate: NavigateFunction, logout: any } ) {
    try {
        const jwtToken = localStorage.getItem(jwtTokenLocalStorage)
        if (jwtToken) {
            const { data } = await api.post('/jwtInit', { jwtToken: jwtToken})
            return data
        }
        navigate('/login')
    } catch (error) {
        setAxiosError(error, logout)
    }
})

const initialSlice = createSlice({
    name: 'initial',
    initialState: {
        jwt: null,
        username: null,
        isLoading: true,
    },
    reducers: {
        setUserCredentials: (state, { payload: { jwt, username} }) => {
            state.jwt = jwt
            state.username = username
            localStorage.setItem(jwtTokenLocalStorage, jwt)
            httpClient.defaults.headers['accessToken'] = jwt
        },
        logout: (state, { payload: { navigate } }) => {
            state.jwt = null
            state.username = null
            localStorage.clear()
            navigate('/login')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userInit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userInit.fulfilled, (state, { payload }) => {
                state.isLoading = false

                if (!payload) {
                    return
                }
                state.username = payload?.user?.username
                state.jwt = payload?.jwt
                httpClient.defaults.headers.common['Accesstoken'] = payload?.jwt
            })
            .addCase(userInit.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const {
    setUserCredentials,
    logout,
} = initialSlice.actions

export default initialSlice.reducer
