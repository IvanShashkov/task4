import {
    FunctionComponent,
    useState
} from "react"
import {
    Button,
    Flex,
    Input,
    Typography
} from "antd";
import TSContentBox from "../../../components/TSContentBox"

import {Link, useNavigate} from "react-router-dom"

import {initialInput} from "../../../defaults"

import {enqueueSnackbar} from "notistack"
import authApi from "../authApi"

import { useDispatch } from 'react-redux'
import {logout, setUserCredentials} from "../../../store/initialSlice"
import setAxiosError from "../../../api/setAxiosError"
import {AppDispatch} from "../../../store/store"

type propsType  = {
    type: 'registration' | 'login'
}

const link = new Map([
    ['registration', 'login'],
    ['login', 'registration'],
])

const AuthForms: FunctionComponent<propsType> = ({ type }) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [username, setUsername] = useState(initialInput)
    const [email, setEmail] = useState(initialInput)
    const [password, setPassword] = useState(initialInput)
    const [isLoading, setIsLoading] = useState(false)

    const payload = {
        username: username.value,
        email: email.value,
        password: password.value,
    }

    const doRegistration = async () => {
        setIsLoading(true)
        try {
            await authApi.getReg(payload)

            const { data: { jwt } } = await authApi.getLogin(payload)

            dispatch(setUserCredentials({
                jwt: jwt,
                username: username.value
            }))

            enqueueSnackbar('User created')

            navigate('/')
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }
    const doLogin = async () => {
        setIsLoading(true)
        try {
            const { data: { jwt } } = await authApi.getLogin(payload)
            dispatch(setUserCredentials({
                jwt: jwt,
                username: username.value
            }))
            navigate('/')
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }
    const hasErrorForm = (): Boolean => {
        let check = false
        if (!username.value) {
            setUsername({value: username.value, status: 'error'})
            check = true
        }
        if (!password.value) {
            setPassword({value: password.value, status: 'error'})
            check = true
        }
        if (!email.value && type === 'registration') {
            setEmail({value: email.value, status: 'error'})
            check = true
        }
        return check
    }
    const formsAction = () => {
        if (hasErrorForm()) {
            return
        }
        if (type === 'registration') {
            doRegistration()
            return
        }
        if (type === 'login') {
            doLogin()
            return
        }
    }

    return (
        <TSContentBox
            style={{ width: '500px'}}
        >
            <Flex
                vertical={true}
                gap={16}
                align={'center'}
                justify={'center'}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        formsAction()
                    }
                }}
            >
                <Typography.Title level={2}>
                    task4
                </Typography.Title>
                <Input
                    size={'large'}
                    placeholder={'Username'}
                    value={username.value}
                    status={username.status}
                    onChange={(event) => setUsername({...initialInput, value: event.target.value})}
                />
                <Input
                    size={'large'}
                    placeholder={'Password'}
                    value={password.value}
                    status={password.status}
                    onChange={(event) => setPassword({...initialInput, value: event.target.value})}
                />
                {type === 'registration' &&
                    <Input
                        size={'large'}
                        placeholder={'Email'}
                        value={email.value}
                        status={email.status}
                        onChange={(event) => setEmail({...initialInput, value: event.target.value})}
                    />
                }
                <Link
                    to={`/${link.get(type)}`}
                >
                    {type === 'login' && 'Dont have an account? Register'}
                    {type === 'registration' && 'Do you have account? Login'}
                </Link>
                <Button
                    size={'large'}
                    type={'primary'}
                    onClick={formsAction}
                    disabled={isLoading}
                >
                    {type}
                </Button>
            </Flex>
        </TSContentBox>
    )
}

export default AuthForms