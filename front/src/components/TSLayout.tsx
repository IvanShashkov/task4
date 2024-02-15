import {FunctionComponent, useEffect} from "react"
import {Layout, Spin} from "antd"
import {Outlet, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logout, userInit} from "../store/initialSlice"
import TSAccountMenu from "./TSAccountMenu";
import {AppDispatch, RootState} from "../store/store"

const TSLayout: FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const userLoading = useSelector((state: RootState) => state.initial.isLoading)
    const { Header, Content} = Layout

    const logoutSlice = () => dispatch(logout({ navigate: navigate}))

    useEffect(() => {
        dispatch(userInit({ navigate, logout: logoutSlice}))
    }, [])

    if (userLoading) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    width: '100%',
                    height: '100%',
                }}
            >
                <Spin/>
            </div>
        )
    }

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    height: '60px',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                }}
            >
                <TSAccountMenu/>
            </Header>
            <Content
                style={{
                    display: 'flex',
                    padding: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Outlet/>
            </Content>
        </Layout>
    )
}

export default TSLayout