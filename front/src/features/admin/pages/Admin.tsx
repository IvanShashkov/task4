import {
    FunctionComponent,
    useEffect,
    useState
} from "react"

import {
    Button,
    Flex,
    Table,
} from "antd"
import {
    DeleteOutlined, DislikeOutlined, LikeOutlined,

} from "@ant-design/icons"

import adminTableConfig from "../components/adminTableConfig"
import adminApi from "../adminApi"

import TSContentBox from "../../../components/TSContentBox"
import setAxiosError from "../../../api/setAxiosError"
import {useNavigate} from "react-router-dom"

import {useDispatch} from "react-redux"
import {logout} from "../../../store/initialSlice"

const Admin: FunctionComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [usersList, setUsersList] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const selectionOnChange = (selectedRowKeys: any) => {
        setSelectedUsers(selectedRowKeys)
    }
    const actionButtonDisabled = () => selectedUsers?.length <= 0 || isLoading
    const getUsers = async () => {
        setIsLoading(true)
        try {
            const { data: users }:any = await adminApi.getUsers()
            setUsersList(users?.users)
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }
    const getBan = async () => {
        setIsLoading(true)
        try {
            const { data: users }:any = await adminApi.getBan({ idCollection: selectedUsers})
            setUsersList(users?.users)
            setSelectedUsers([])
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }
    const getUnban = async () => {
        setIsLoading(true)
        try {
            const { data: users }:any = await adminApi.getUnban({ idCollection: selectedUsers})
            setUsersList(users?.users)
            setSelectedUsers([])
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }

    const getDelete = async () => {
        setIsLoading(true)
        try {
            const { data: users }:any = await adminApi.getDelete({ idCollection: selectedUsers})
            setUsersList(users?.users)
            setSelectedUsers([])
        } catch (error) {
            setAxiosError(error, () => dispatch(logout({ navigate: navigate})))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <TSContentBox>
            <Flex
                vertical={true}
                gap={12}
            >
                <Flex
                    gap={8}
                    justify={'center'}
                >
                    <Button
                        icon={ <DislikeOutlined /> }
                        onClick={getBan}
                        disabled={actionButtonDisabled()}
                        size={'large'}
                    >
                        ban
                    </Button>
                    <Button
                        icon={ <LikeOutlined /> }
                        onClick={getUnban}
                        disabled={actionButtonDisabled()}
                        size={'large'}
                    >
                        unban
                    </Button>
                    <Button
                        icon={ <DeleteOutlined /> }
                        onClick={getDelete}
                        disabled={actionButtonDisabled()}
                        size={'large'}
                    >
                        delete
                    </Button>
                </Flex>
                <Table
                    columns={adminTableConfig()}
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedUsers,
                        onChange: selectionOnChange,
                    }}
                    dataSource={usersList}
                    loading={isLoading}
                    rowKey={'_id'}
                />
            </Flex>
        </TSContentBox>
    )
}

export default Admin